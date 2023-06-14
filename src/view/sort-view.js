import AbstractView from '../framework/view/abstract-view.js';
import {SORT_TYPE} from '../const.js';

function createSortItemTemplate(item, isChecked) {
  const {name, enabled} = item;

  return (`
    <div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        data-sort-type="${name}"
        ${isChecked ? 'checked' : ''}
        ${enabled ? '' : 'disabled'}
      >
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>
  `);
}

function createSortTemplate() {
  const sortTemplate = Object.values(SORT_TYPE)
    .map((item, index) => createSortItemTemplate(item, index === 0))
    .join('');

  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTemplate}
    </form>
  `);
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
