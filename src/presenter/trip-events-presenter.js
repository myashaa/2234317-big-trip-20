//import CreationFormView from '../view/creation-form-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import NoTripPointView from '../view/no-point-view.js';
import {render} from '../framework/render.js';
import TripPointPresenter from './trip-point-presenter.js';
import {sort} from '../utils/sort.js';
import {
  SORT_TYPE,
  USER_ACTION,
  UPDATE_TYPE
} from '../const.js';

export default class TripEventsPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #pointPresenters = new Map();
  #currentSortType = SORT_TYPE.DAY.name;

  #listComponent = new ListView();
  #sortComponent = null;
  #noPointComponent = new NoTripPointView();

  constructor({tripContainer, pointsModel, offersModel, destinationsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    sort(this.points, this.#currentSortType);

    if (this.points.length === 0) {
      this.#renderNoPoint();
    } else {
      this.#renderRouteSheet();
    }
  }

  #renderRouteSheet() {
    this.#renderSort();
    this.#renderList();

    //render(new CreationFormView(), this.#listComponent.element);

    this.#renderPoints(this.points, this.#offersModel, this.#destinationsModel);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
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

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortPoints(sortType) {
    sort(this.points, sortType);
    this.#currentSortType = sortType;
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
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UPDATE_TYPE.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
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

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints(this.points, this.#offersModel, this.#destinationsModel);
  };
}
