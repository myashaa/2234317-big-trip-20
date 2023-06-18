import {FILTER_TYPE} from '../const/filter';
import Observable from '../framework/observable.js';

export default class FilterModel extends Observable {
  #filter = FILTER_TYPE.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
