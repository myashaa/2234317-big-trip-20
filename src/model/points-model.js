import {POINT_COUNT} from '../const.js';
import {getRandomPoint} from '../mock/point.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = Array.from({ length: POINT_COUNT }, getRandomPoint);

  get points() {
    return this.#points;
  }
}
