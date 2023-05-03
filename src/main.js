import CreationFormView from './view/creation-form-view.js';
import EditFormView from './view/edit-form-view.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import ListView from './view/list-view.js';
import TripPointView from './view/point-view.js';
import {
  RenderPosition,
  render
} from './render.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const ListComponent = new ListView();

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripFiltersElement);
render(new SortView(), tripEventsElement);
render(ListComponent, tripEventsElement);
//render(new CreationFormView(), ListComponent.getElement());
render(new EditFormView(), ListComponent.getElement());
for (let i = 0; i < 3; i++) {
  render(new TripPointView(), ListComponent.getElement());
}

