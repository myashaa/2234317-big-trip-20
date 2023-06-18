import {mockDestinations} from '../mock/destination.js';

export default class DestinationsModel {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }
}
