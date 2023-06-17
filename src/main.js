import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import {
  RenderPosition,
  render
} from './framework/render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';

const filters = [
  {
    type: 'everything',
    hasPoints: false,
  },
];

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const tripEventsPresenter = new TripEventsPresenter({
  tripContainer: tripEventsElement,
  pointsModel,
  offersModel,
  destinationsModel
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView({
  filters,
  currentFilterType: 'everything',
  onFilterTypeChange: () => {}
}), tripFiltersElement);
tripEventsPresenter.init();
