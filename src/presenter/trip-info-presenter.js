import TripInfoView from '../view/trip-info-view.js';
import {
  render,
  RenderPosition,
  replace,
  remove
} from '../framework/render.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];
  #offers = [];
  #destinations = [];

  #tripInfoComponent = null;

  constructor({tripInfoContainer, pointsModel, offersModel, destinationsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  async init() {
    const prevTripInfoComponent = this.#tripInfoComponent;

    await Promise.all([
      this.#points = [...this.#pointsModel.points],
      this.#offers = [...this.#offersModel.offers],
      this.#destinations = [...this.#destinationsModel.destinations],
    ]);

    this.#tripInfoComponent = new TripInfoView({
      points: this.#points,
      offers: this.#offers,
      destinations: this.#destinations
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
