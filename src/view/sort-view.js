import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const/sort.js';

function createSortItemTemplate(item, isChecked) {
  const {NAME, ENABLED} = item;

  return (`
    <div class="trip-sort__item  trip-sort__item--${NAME}">
      <input id="sort-${NAME}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${NAME}"
        data-sort-type="${NAME}"
        ${isChecked ? 'checked' : ''}
        ${ENABLED ? '' : 'disabled'}
      >
      <label class="trip-sort__btn" for="sort-${NAME}">${NAME}</label>
    </div>
  `);
}

function createSortTemplate(currentSortType) {
  const sortTemplate = Object.values(SortType)
    .map((item) => createSortItemTemplate(item, item.NAME === currentSortType))
    .join('');

  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTemplate}
    </form>
  `);
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
