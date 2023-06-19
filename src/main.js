import NewPointButtonView from './view/new-point-button-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api/points-api-service.js';
import OfferssApiService from './api/offers-api-service.js';
import DestinationsApiService from './api/destinations-api-service.js';
import {render} from './framework/render.js';
import {
  AUTHORIZATION,
  END_POINT
} from './const/api.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const offersModel = new OffersModel({
  offersApiService: new OfferssApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  offersModel,
  destinationsModel
});
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
const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: tripMainElement,
  pointsModel,
  offersModel,
  destinationsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointButtonClick() {
  tripEventsPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

filterPresenter.init();
tripEventsPresenter.init();
//tripInfoPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMainElement);
  });
