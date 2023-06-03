import {getRandomPoint} from '../mock/point.js';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destination.js';

const POINT_COUNT = 3;

export default class PointsModel {
  points = Array.from({ length: POINT_COUNT }, getRandomPoint);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
