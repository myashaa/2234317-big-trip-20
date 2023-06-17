import {POINT_COUNT} from '../const.js';
import {getRandomPoint} from '../mock/point.js';

export default class PointsModel {
  #points = Array.from({ length: POINT_COUNT }, getRandomPoint);

  get points() {
    return this.#points;
  }
}
