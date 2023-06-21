import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorMessageView from '../view/error-message-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {
  render,
  remove
} from '../framework/render.js';
import {sort} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import {SortType} from '../const/sort.js';
import {FilterType} from '../const/filter.js';
import {
  UserAction,
  UpdateType,
  TimeLimit
} from '../const/common.js';

export default class TripEventsPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY.NAME;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isError = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #listComponent = new ListView();
  #sortComponent = null;
  #noPointComponent = null;
  #loadingComponent = new LoadingView();
  #errorMessageComponent = new ErrorMessageView();

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
    this.#currentSortType = SortType.DAY.NAME;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderRouteSheet() {
    if (this.#isError) {
      this.#renderErrorMessage();
      return;
    }

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
      this.#renderList();
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
    remove(this.#errorMessageComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.NAME;
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer);
  }

  #renderErrorMessage() {
    render(this.#errorMessageComponent, this.#tripContainer);
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
    points.forEach((point) => {
      this.#renderPoint(point, offersModel, destinationsModel);
    });
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#tripContainer);
  }

  #renderPoint(point, offersModel, destinationsModel) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#listComponent.element,
      offersModel,
      destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearRouteSheet();
        this.#renderRouteSheet();
        break;
      case UpdateType.MAJOR:
        this.#clearRouteSheet({resetSortType: true});
        this.#renderRouteSheet();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        if (data.isError) {
          this.#isError = true;
        } else {
          this.#isError = false;
        }
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
