//import CreationFormView from '../view/creation-form-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import NoTripPointView from '../view/no-point-view.js';
import {render} from '../framework/render.js';
import TripPointPresenter from './trip-point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sort} from '../utils/sort.js';
import {SORT_TYPE} from '../const.js';

export default class TripEventsPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];
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
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    sort(this.#points, this.#currentSortType);

    if (this.#points.length === 0) {
      this.#renderNoPoint();
    } else {
      this.#renderRouteSheet();
    }
  }

  #renderRouteSheet() {
    this.#renderSort();
    this.#renderList();

    //render(new CreationFormView(), this.#listComponent.element);

    this.#renderPoints(this.#points, this.#offersModel, this.#destinationsModel);
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
    sort(this.#points, sortType);
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
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
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
    this.#renderPoints(this.#points, this.#offersModel, this.#destinationsModel);
  };
}
