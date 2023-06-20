import AbstractView from '../framework/view/abstract-view.js';
import {NoPointsTextType} from '../const/filter.js';

function createNoPointTemplate(filterType) {
  return (`
    <p class="trip-events__msg">${NoPointsTextType[filterType]}</p>
  `);
}

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
