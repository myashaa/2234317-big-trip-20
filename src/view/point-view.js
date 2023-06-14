import {
  DATE_FORMAT,
  TIME_FORMAT,
  humanizeDate,
  getDuration
} from '../utils/date.js';
import AbstractView from '../framework/view/abstract-view.js';

function getDestination (allDestinations, pointDestination) {
  const choosenDestination = allDestinations.find((item) => pointDestination.includes(item.id));
  return choosenDestination.name;
}

function getOffers (allOffers, pointOffers, pointType) {
  const pointTypeOffers = allOffers.find((item) => item.type === pointType).offers;
  const choosenOffers = pointTypeOffers.filter((item) => pointOffers.includes(item.id));
  return choosenOffers;
}

function createTripPointOfferTemplate(offer) {
  const {title, price} = offer;

  return (`
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `);
}

function createTripPointOffersTemplate(allOffers, pointOffers, pointType) {
  const offerTemplate = getOffers(allOffers, pointOffers, pointType)
    .map((offer) => createTripPointOfferTemplate(offer))
    .join('');

  return (`
    <ul class="event__selected-offers">
      ${offerTemplate}
    </ul>
  `);
}

function createTripPointTemplate (point, allOffers, allDestinations) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = point;

  const date = humanizeDate(dateFrom, DATE_FORMAT);
  const timeFrom = humanizeDate(dateFrom, TIME_FORMAT);
  const timeTo = humanizeDate(dateTo, TIME_FORMAT);
  const duration = getDuration(dateFrom, dateTo);

  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dateFrom}>${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${getDestination(allDestinations, destination)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dateFrom}>${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime=${dateTo}>${timeTo}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createTripPointOffersTemplate(allOffers, offers, type)}
        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
}

export default class TripPointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, offers, destinations, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
