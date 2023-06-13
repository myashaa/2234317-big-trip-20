//import CreationFormView from '../view/creation-form-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import NoTripPointView from '../view/no-point-view.js';
import {render} from '../framework/render.js';
import TripPointPresenter from './trip-point-presenter.js';

export default class TripEventsPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #points = [];
  #offers = [];
  #destinations = [];

  #listComponent = new ListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoTripPointView();

  constructor({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

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

    this.#renderPoints(this.#points, this.#offers, this.#destinations);
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderList() {
    render(this.#listComponent, this.#tripContainer);
  }

  #renderPoints(points, offers, destinations) {
    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i], offers, destinations);
    }
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#tripContainer);
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new TripPointPresenter({
      pointContainer: this.#listComponent.element,
    });
    pointPresenter.init(point, offers, destinations);
  }
}
