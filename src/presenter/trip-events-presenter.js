import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import NoTripPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import {
  render,
  remove
} from '../framework/render.js';
import TripPointPresenter from './trip-point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {sort} from '../utils/sort.js';
import {SORT_TYPE} from '../const/sort.js';
import {FILTER_TYPE} from '../const/filter.js';
import {
  USER_ACTION,
  UPDATE_TYPE,
} from '../const/common.js';
import {filter} from '../utils/filter.js';

export default class TripEventsPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SORT_TYPE.DAY.name;
  #filterType = FILTER_TYPE.EVERYTHING;
  #isLoading = true;

  #listComponent = new ListView();
  #sortComponent = null;
  #noPointComponent = null;
  #loadingComponent = new LoadingView();

  constructor({tripContainer, pointsModel, offersModel, destinationsModel, filterModel, onNewPointDestroy}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    sort(filteredPoints, this.#currentSortType);

    return filteredPoints;
  }

  init() {
    this.#renderRouteSheet();
  }

  createPoint() {
    this.#currentSortType = SORT_TYPE.DAY.name;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderRouteSheet() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#renderPoints(this.points, this.#offersModel, this.#destinationsModel);
  }

  #clearRouteSheet({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DAY.name;
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripContainer);
  }

  #renderList() {
    render(this.#listComponent, this.#tripContainer);
  }

  #renderPoints(points, offersModel, destinationsModel) {
    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i], offersModel, destinationsModel);
    }
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoTripPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#tripContainer);
  }

  #renderPoint(point, offersModel, destinationsModel) {
    const pointPresenter = new TripPointPresenter({
      pointContainer: this.#listComponent.element,
      offersModel: offersModel,
      destinationsModel: destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case USER_ACTION.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearRouteSheet();
        this.#renderRouteSheet();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearRouteSheet({resetSortType: true});
        this.#renderRouteSheet();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderRouteSheet();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearRouteSheet();
    this.#renderRouteSheet();
  };
}
