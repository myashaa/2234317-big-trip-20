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
        id: '0',
        title: 'Upgrade to a business class',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Order Uber',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Transportation of an animal',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'Child safety seat',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.BUS,
    offers: [
      {
        id: '0',
        title: 'Transportation of an animal',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Baggage transportation',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'A place for a disabled person',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'Baggage transportation',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.TRAIN,
    offers: [
      {
        id: '0',
        title: 'Baggage transportation',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Transportation of an animal',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'A place for a disabled person',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'A place for a child',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.SHIP,
    offers: [
      {
        id: '0',
        title: 'A place for a child',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'A place for a disabled person',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Transportation of an animal',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'Baggage transportation',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.CHECK_IN,
    offers: [
      {
        id: '0',
        title: 'Add breakfast',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Add lunch',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Add dinner',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'Add three meals a day',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.FLIGHT,
    offers: [
      {
        id: '0',
        title: 'Add luggage',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Transportation for an animal',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'Baggage transportation',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.DRIVE,
    offers: [
      {
        id: '0',
        title: 'Rent a car',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Baggage transportation',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Child safety seat',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'Transportation for an animal',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.SIGHTSEEING,
    offers: [
      {
        id: '0',
        title: 'Book tickets',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Lunch in city',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Book tickets',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'Breakfast in city',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.RESTAURANT,
    offers: [
      {
        id: '0',
        title: 'Book a table',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Live music',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Personal waiter',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'A compliment from the chef',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: POINT_TYPE.FLIGHT,
    offers: [
      {
        id: '0',
        title: 'Add luggage',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '1',
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '2',
        title: 'Transportation for an animal',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      },
      {
        id: '3',
        title: 'A place for a child',
        price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  }
];

export {mockOffers};
