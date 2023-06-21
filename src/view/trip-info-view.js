import AbstractView from '../framework/view/abstract-view.js';
import {sort} from '../utils/sort.js';
import {
  INFO_FORMAT,
  humanizeDate
} from '../utils/date.js';
import {
  getDestinationById,
  getOffers
} from '../utils/point.js';
import {SortType} from '../const/sort.js';
import {POINT_COUNT_IN_ROUTE} from '../const/point.js';

function getPointDestination(destinations, point) {
  return getDestinationById(destinations, point.destination).name;
}

function getTripPoints(points, destinations) {
  if (points.length > POINT_COUNT_IN_ROUTE) {
    return `${getPointDestination(destinations, points[0])} &mdash; ... &mdash; ${getPointDestination(destinations, points[points.length - 1])}`;
  }

  let tripPoints = '';
  for (let i = 0; i < points.length; i++) {
    if (i === points.length - 1) {
      tripPoints = `${tripPoints}${getPointDestination(destinations, points[i])}`;
      return tripPoints;
    }
    tripPoints = `${tripPoints}${getPointDestination(destinations, points[i])} &mdash; `;
  }

  return tripPoints;
}

function getOfferPrice(id, point, offers) {
  return getOffers(offers, point.type).find((offer) => offer.id === id).price;
}

function getOffersPrice(point, offers) {
  return point.offers.reduce((sum, id) => sum + getOfferPrice(id, point, offers), 0);
}

function getTotalPrice(points, offers) {
  return points.reduce((sum, point) => sum + point.basePrice + getOffersPrice(point, offers), 0);
}

function createTripInfoTemplate(points, offers, destinations) {
  if (points.length === 0) {
    return (`
    <section class="trip-main__trip-info  trip-info">
    </section>
  `);
  }

  sort(points, SortType.DAY.NAME);
  const startPoint = points[0];
  const endPoint = (points.length === 1) ? startPoint : points[points.length - 1];

  const dateFrom = humanizeDate(startPoint.dateFrom, INFO_FORMAT);
  const dateTo = humanizeDate(endPoint.dateTo, INFO_FORMAT);
  const tripPoints = getTripPoints(points, destinations);
  const totalPrice = getTotalPrice(points, offers);

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${tripPoints}
        </h1>
        <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>
  `);
}

export default class TripInfoView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor({points, offers, destinations}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#offers, this.#destinations);
  }
}
