import {nanoid} from 'nanoid';
import {
  MIN_POINT_PRICE,
  MAX_POINT_PRICE,
  POINT_TYPE
} from '../const.js';
import {
  getRandomInteger,
  getRandomArrayElement
} from '../utils/common.js';
import {getRandomDestination} from './destination.js';

const mockPoints = [
  {
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: '2023-01-02T10:45',
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
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: '2023-01-03T11:45',
    dateTo: '2023-01-03T15:05',
    destination: getRandomDestination().id,
    isFavorite: true,
    offers: ['2'],
    type: POINT_TYPE.RESTAURANT
  },
  {
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: '2023-01-03T12:45',
    dateTo: '2023-01-04T15:15',
    destination: getRandomDestination().id,
    isFavorite: false,
    offers: [
      '0',
      '3'
    ],
    type: POINT_TYPE.SHIP
  },
  {
    basePrice: getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    dateFrom: '2023-01-04T13:45',
    dateTo: '2023-01-04T14:25',
    destination: getRandomDestination().id,
    isFavorite: false,
    offers: ['0'],
    type: POINT_TYPE.TRAIN
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export {getRandomPoint};
