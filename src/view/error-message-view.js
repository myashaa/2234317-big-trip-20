import AbstractView from '../framework/view/abstract-view.js';

function createErrorMessageTemplate() {
  return (`
    <p class="trip-events__msg">Server is not available now.</p>
  `);
}

export default class ErrorMessageView extends AbstractView {
  get template() {
    return createErrorMessageTemplate();
  }
}
