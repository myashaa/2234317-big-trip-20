import AbstractView from '../framework/view/abstract-view.js';

function createNoTripPointTemplate() {
  return (`
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `);
}

export default class NoTripPointView extends AbstractView {
  get template() {
    return createNoTripPointTemplate();
  }
}
