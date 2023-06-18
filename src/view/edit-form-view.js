import he from 'he';
import {
  POINT_TYPE,
  MAX_DATE_TO,
  BLANK_POINT,
  BLANK_POINT_ID
} from '../const/point.js';
import {
  CURRENT_DATE,
  DATE_TIME_FORMAT,
  humanizeDate
} from '../utils/date.js';
import {insertDashIntoStr} from '../utils/common.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function getDestinationById (allDestinations, pointDestination) {
  return allDestinations.find((item) => pointDestination.includes(item.id));
}

function getDestinationByName (allDestinations, pointDestination) {
  return allDestinations.find((item) => pointDestination.includes(item.name));
}

function getOffers(allOffers, pointType) {
  return allOffers.find((item) => item.type === pointType).offers;
}

function createEditFormOfferTemplate(pointOffers, offer) {
  const {id, title, price} = offer;
  const checked = pointOffers.includes(id) ? 'checked' : '';

  return (`
    <div class="event__offer-selector">
      <input id="event-offer-${insertDashIntoStr(title)}"
        class="event__offer-checkbox  visually-hidden"
        type="checkbox"
        name="event-offer-${insertDashIntoStr(title)}"
        data-offer-id="${id}"
        ${checked}
      >
      <label class="event__offer-label" for="event-offer-${insertDashIntoStr(title)}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `);
}

function createEditFormOffersTemplate(allOffers, pointOffers, pointType) {
  const offers = getOffers(allOffers, pointType);
  const isHidden = offers.length === 0;

  const offerTemplate = offers
    .map((offer) => createEditFormOfferTemplate(pointOffers, offer))
    .join('');

  return (`
    <section class="event__section  event__section--offers ${isHidden ? 'visually-hidden' : ''}">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offerTemplate}
      </div>
    </section>
  `);
}

function createEditFormDestinationTemplate (allDestinations) {
  return allDestinations.map((destination) => `
    <option value="${destination.name}"></option>
  `).join('');
}

function createEditFormDestinationDescTemplate(pointDestination) {
  const {description, pictures} = pointDestination;
  const isHidden = description === '' && pictures.length === 0;

  const destinationImages = pictures.map((image) =>`
    <img class="event__photo" src="${image.src}" alt="${image.description}">
  `).join('');

  return (`
    <section class="event__section  event__section--destination ${isHidden ? 'visually-hidden' : ''}">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destinationImages}
        </div>
      </div>
    </section>
  `);
}

function createEditFormTypeTemplate(pointType, type) {
  const checked = type === pointType ? 'checked' : '';

  return (`
    <div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type.toLowerCase()}"
        ${checked}
      >
      <label class="event__type-label  event__type-label--${type.toLowerCase()}"
        for="event-type-${type.toLowerCase()}"
        data-type="${type}"
      >
        ${type}
      </label>
    </div>
  `);
}

function createEditFormTypesTemplate(pointType) {
  const typeTemplate = Object.values(POINT_TYPE)
    .map((type) => createEditFormTypeTemplate(pointType, type))
    .join('');

  return (`
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${typeTemplate}
    </fieldset>
  `);
}

function createEditFormButtonsTemplate(isCreating) {
  return (`
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${isCreating ? 'Cancel' : 'Delete'}</button>
    <button class="event__rollup-btn" ${isCreating ? 'style="display:none;"' : ''} type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  `);
}

function createEditFormTemplate(point, allOffers, allDestinations) {
  const {id, basePrice, dateFrom, dateTo, destination, offers, type} = point;

  const pointDestination = getDestinationById(allDestinations, destination);
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
              ${createEditFormTypesTemplate(type)}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input id="event-destination-1"
              class="event__input  event__input--destination"
              type="text"
              name="event-destination"
              value="${he.encode(pointDestination.name)}"
              list="destination-list-1"
              required
            >
            <datalist id="destination-list-1">
              ${createEditFormDestinationTemplate(allDestinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input id="event-start-time-1"
              class="event__input  event__input--time"
              type="text"
              name="event-start-time"
              value="${timeFrom}"
              required
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input id="event-end-time-1"
              class="event__input  event__input--time"
              type="text"
              name="event-end-time"
              value="${timeTo}"
              required
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input id="event-price-1"
              class="event__input  event__input--price"
              type="number"
              min="0"
              name="event-price"
              value="${he.encode(basePrice.toString())}"
              required
            >
          </div>

          ${createEditFormButtonsTemplate(id === BLANK_POINT_ID)}
        </header>
        <section class="event__details">
          ${createEditFormOffersTemplate(allOffers, offers, type)}

          ${createEditFormDestinationDescTemplate(getDestinationById(allDestinations, destination))}
        </section>
      </form>
    </li>
  `);
}

export default class EditFormView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleRollUpClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point = BLANK_POINT, offers, destinations, onFormSubmit, onRollUpClick, onDeleteClick}) {
    super();
    this._setState(EditFormView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollUpClick = onRollUpClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#destroyDatepicker(this.#datepickerFrom);
    }

    if (this.#datepickerTo) {
      this.#destroyDatepicker(this.#datepickerTo);
    }
  }

  reset(point) {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#typeClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepickers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #rollUpClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpClick();
  };

  #typeClickHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.dataset.type;
    this.updateElement({
      type: newType,
      offers: getOffers(this.#offers, newType),
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = getDestinationByName(this.#destinations, evt.target.value);
    if (!newDestination) {
      evt.target.value = '';
      return;
    }
    this.updateElement({
      destination: newDestination.id,
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const choosenOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const offersId = choosenOffers.map((offer) => offer.dataset.offerId);
    this._setState({
      offers: offersId,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;
    this._setState({
      basePrice: newPrice,
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepickers() {
    const dateFromElement = this.element.querySelector('#event-start-time-1');
    const dateToElement = this.element.querySelector('#event-end-time-1');

    this.#datepickerFrom = this.#setDatepicker(dateFromElement, CURRENT_DATE, this._state.dateFrom, this._state.dateTo, this.#dateFromChangeHandler);
    this.#datepickerTo = this.#setDatepicker(dateToElement, this._state.dateFrom, this._state.dateTo, MAX_DATE_TO, this.#dateToChangeHandler);
  }

  #setDatepicker(element, minDate, date, maxDate, handler) {
    return new flatpickr(
      element,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        minDate: minDate,
        defaultDate: date,
        maxDate: maxDate,
        onChange: handler,
        'time_24hr': true
      },
    );
  }

  #destroyDatepicker(datepicker) {
    datepicker.destroy();
    datepicker = null;
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
