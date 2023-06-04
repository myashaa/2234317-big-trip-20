import {POINT_TYPE} from '../const.js';
import {
  DATE_TIME_FORMAT,
  humanizeDate,
  insertDashIntoStr
} from '../utils.js';
import {createElement} from '../render.js';

function getDestination (allDestinations, pointDestination) {
  return allDestinations.find((item) => pointDestination.includes(item.id));
}

function getOffers (allOffers, pointType) {
  return allOffers.find((item) => item.type === pointType).offers;
}

function createEditFormOfferTemplate (allOffers, pointOffers, pointType) {
  return getOffers(allOffers, pointType).map((offer) => {
    const checked = pointOffers.includes(offer.id) ? 'checked' : '';

    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${insertDashIntoStr(offer.title)}" type="checkbox" name="event-offer-${insertDashIntoStr(offer.title)}" ${checked}>
        <label class="event__offer-label" for="event-offer-${insertDashIntoStr(offer.title)}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }).join('');
}

function createEditFormDestinationTemplate (allDestinations) {
  return allDestinations.map((destination) => `
    <option value="${destination.name}"></option>
  `).join('');
}

function createEditFormDestinationDescTemplate (pointDestination) {
  const destinationImages = pointDestination.pictures.map((image) =>`
    <img class="event__photo" src="${image.src}" alt="${image.description}">
  `).join('');

  return (`
    <p class="event__destination-description">${pointDestination.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destinationImages}
      </div>
    </div>
  `);
}

function createEditFormTypeTemplate(pointType) {
  return Object.values(POINT_TYPE).map((type) => {
    const checked = type === pointType ? 'checked' : '';

    return `
      <div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${checked}>
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}">${type}</label>
      </div>
    `;
  }).join('');
}

function createEditFormTemplate(point, allOffers, allDestinations) {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = point;

  const pointDestination = getDestination(allDestinations, destination);
  const timeFrom = humanizeDate(dateFrom, DATE_TIME_FORMAT);
  const timeTo = humanizeDate(dateTo, DATE_TIME_FORMAT);

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEditFormTypeTemplate(type)}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createEditFormDestinationTemplate(allDestinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${createEditFormOfferTemplate(allOffers, offers, type)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${createEditFormDestinationDescTemplate(getDestination(allDestinations, destination))}
          </section>
        </section>
      </form>
    </li>
  `);
}

export default class EditFormView {
  constructor({point, offers, destinations}) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEditFormTemplate(this.point, this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
