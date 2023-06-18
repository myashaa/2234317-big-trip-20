const POINT_COUNT = 5;

const MIN_OFFER_PRICE = 10;
const MAX_OFFER_PRICE = 200;

const DESTINATION_PHOTO_URL = 'https://loremflickr.com/248/152?random=';
const MIN_INDEX_OF_DESTINATION_PHOTO = 1;
const MAX_INDEX_OF_DESTINATION_PHOTO = 100;

const MIN_POINT_PRICE = 1000;
const MAX_POINT_PRICE = 7000;

const MAX_DATE_TO = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

const POINT_TYPE = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant'
};

const BLANK_POINT_ID = '-1';
const BLANK_POINT = {
  id: BLANK_POINT_ID,
  basePrice: '0',
  dateFrom: new Date,
  dateTo: new Date,
  destination: '1',
  isFavorite: false,
  offers: [1],
  type: POINT_TYPE.TAXI,
};

const DESTINATION_DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const NoPointsTextType = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
  [FILTER_TYPE.PRESENT]: 'There are no present events now',
  [FILTER_TYPE.PAST]: 'There are no past events now',
};

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SORT_TYPE = {
  DAY: {
    name: 'day',
    enabled: true,
  },
  EVENT: {
    name: 'event',
    enabled: false,
  },
  TIME: {
    name: 'time',
    enabled: true,
  },
  PRICE: {
    name: 'price',
    enabled: true,
  },
  OFFERS: {
    name: 'offers',
    enabled: false,
  },
};

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


export {
  BLANK_POINT,
  BLANK_POINT_ID,
  DESTINATION_DESCRIPTION,
  DESTINATION_PHOTO_URL,
  FILTER_TYPE,
  MIN_OFFER_PRICE,
  MIN_INDEX_OF_DESTINATION_PHOTO,
  MIN_POINT_PRICE,
  MAX_OFFER_PRICE,
  MAX_INDEX_OF_DESTINATION_PHOTO,
  MAX_POINT_PRICE,
  MAX_DATE_TO,
  MODE,
  NoPointsTextType,
  POINT_COUNT,
  POINT_TYPE,
  SORT_TYPE,
  USER_ACTION,
  UPDATE_TYPE
};
