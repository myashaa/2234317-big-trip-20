import {mockDestinations} from '../mock/destination.js';

export default class DestinationsModel {
  #destinationsApiService = null;
  #destinations = mockDestinations;

  constructor({destinationsApiService}) {
    this.#destinationsApiService = destinationsApiService;

    this.#destinationsApiService.destinations.then((destinations) => {
      console.log(destinations);
    });
  }

  get destinations() {
    return this.#destinations;
  }
}
