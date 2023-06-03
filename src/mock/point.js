import {
  MIN_POINT_PRICE,
  MAX_POINT_PRICE,
  POINT_TYPE
} from '../const.js';
import {
  getRandomInteger,
  getRandomArrayElement
} from '../utils.js';
import {getRandomDestination} from './destination.js';

const mockPoints = [
  {
    id: '1',
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: new Date(Date.parse('2023-01-03T13:45:55.845Z')),
    dateTo: new Date(Date.parse('2023-01-03T13:45:55.845Z')),
    destination: getRandomDestination().id,
    isFavorite: true,
    offers: [
      '2',
      '4'
    ],
    type: POINT_TYPE.TAXI
  },
  {
    id: '2',
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: new Date(Date.parse('2023-01-03T13:45:55.845Z')),
    dateTo: new Date(Date.parse('2023-01-03T13:45:55.845Z')),
    destination: getRandomDestination().id,
    isFavorite: true,
    offers: [
      '3',
      '1'
    ],
    type: POINT_TYPE.RESTAURANT
  },
  {
    id: '3',
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: new Date(Date.parse('2023-01-03T13:45:55.845Z')),
    dateTo: new Date(Date.parse('2023-01-03T13:45:55.845Z')),
    destination: getRandomDestination().id,
    isFavorite: true,
    offers: [
      '1',
      '4'
    ],
    type: POINT_TYPE.SHIP
  },
  {
    id: '4',
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: new Date(Date.parse('2023-01-03T13:45:55.845Z')),
    dateTo: new Date(Date.parse('2023-01-03T13:45:55.845Z')),
    destination: getRandomDestination().id,
    isFavorite: true,
    offers: [
      '2',
      '4'
    ],
    type: POINT_TYPE.TRAIN
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
