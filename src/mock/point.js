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
    id: '0',
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: '2023-01-03T13:45',
    dateTo: '2023-01-03T14:55',
    destination: getRandomDestination().id,
    isFavorite: false,
    offers: [
      '1',
      '3',
      '2'
    ],
    type: POINT_TYPE.TAXI
  },
  {
    id: '1',
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: '2023-01-03T13:45',
    dateTo: '2023-01-03T15:05',
    destination: getRandomDestination().id,
    isFavorite: true,
    offers: ['2'],
    type: POINT_TYPE.RESTAURANT
  },
  {
    id: '2',
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: '2023-01-03T13:45',
    dateTo: '2023-01-03T15:15',
    destination: getRandomDestination().id,
    isFavorite: false,
    offers: [
      '0',
      '3'
    ],
    type: POINT_TYPE.SHIP
  },
  {
    id: '3',
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: '2023-01-03T13:45',
    dateTo: '2023-01-03T14:25',
    destination: getRandomDestination().id,
    isFavorite: false,
    offers: ['0'],
    type: POINT_TYPE.TRAIN
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
