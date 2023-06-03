import {
  POINT_TYPE,
  MIN_OFFER_PRICE,
  MAX_OFFER_PRICE
} from '../const.js';
import {getRandomInteger} from '../utils.js';

const mockOffers = [
  {
    type: POINT_TYPE.TAXI,
    offers: [
      {
        id: '1',
        title: 'Upgrade to a business class',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Order Uber',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.CHECK_IN,
    offers: [
      {
        id: '1',
        title: 'Add breakfast',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.FLIGHT,
    offers: [
      {
        id: '1',
        title: 'Add luggage',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.DRIVE,
    offers: [
      {
        id: '1',
        title: 'Rent a car',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.SIGHTSEEING,
    offers: [
      {
        id: '1',
        title: 'Book tickets',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Lunch in city',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.FLIGHT,
    offers: [
      {
        id: '1',
        title: 'Add luggage',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  }
];

export {mockOffers};
