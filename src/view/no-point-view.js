import AbstractView from '../framework/view/abstract-view.js';
import {NoPointsTextType} from '../const.js';

function createNoTripPointTemplate(filterType) {
  const noPointTextValue = NoPointsTextType[filterType];

  return (`
    <p class="trip-events__msg">${noPointTextValue}</p>
  `);
}

export default class NoTripPointView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTripPointTemplate(this.#filterType);
  }
}
