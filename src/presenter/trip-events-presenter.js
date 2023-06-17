import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import NoTripPointView from '../view/no-point-view.js';
import {
  render,
  remove
} from '../framework/render.js';
import TripPointPresenter from './trip-point-presenter.js';
import {sort} from '../utils/sort.js';
import {
  SORT_TYPE,
  USER_ACTION,
  UPDATE_TYPE
} from '../const.js';
import {filter} from '../utils/filter.js';

export default class TripEventsPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #currentSortType = SORT_TYPE.DAY.name;

  #listComponent = new ListView();
  #sortComponent = null;
  #noPointComponent = new NoTripPointView();

  constructor({tripContainer, pointsModel, offersModel, destinationsModel, filterModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);
    sort(filteredPoints, this.#currentSortType);

    return filteredPoints;
  }

  init() {
    this.#renderRouteSheet();
  }

  #renderRouteSheet() {
    if (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#renderPoints(this.points, this.#offersModel, this.#destinationsModel);
  }

  #clearRouteSheet({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DAY.name;
    }
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

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
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
    }
  };

  #handleModeChange = () => {
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
