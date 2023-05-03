import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import {
  RenderPosition,
  render
} from './render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripEventsPresenter = new TripEventsPresenter({tripContainer: tripEventsElement});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripFiltersElement);
tripEventsPresenter.init();
