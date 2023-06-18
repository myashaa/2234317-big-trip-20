import TripInfoView from './view/trip-info-view.js';
import NewTripPointButtonView from './view/new-point-button-view.js';
import {
  RenderPosition,
  render
} from './framework/render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';

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
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: tripFiltersElement,
  filterModel,
  pointsModel
});
const newPointButtonComponent = new NewTripPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointButtonClick() {
  tripEventsPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(newPointButtonComponent, tripMainElement);

filterPresenter.init();
tripEventsPresenter.init();
