import {getRandomPoint} from '../mock/point.js';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destination.js';

const POINT_COUNT = 7;

export default class PointsModel {
  #points = Array.from({ length: POINT_COUNT }, getRandomPoint);
  #offers = mockOffers;
  #destinations = mockDestinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
