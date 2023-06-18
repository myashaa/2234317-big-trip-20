import {mockOffers} from '../mock/offers.js';

export default class OffersModel {
  #offersApiService = null;
  #offers = mockOffers;

  constructor({offersApiService}) {
    this.#offersApiService = offersApiService;

    this.#offersApiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  get offers() {
    return this.#offers;
  }
}
