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

export {
  BLANK_POINT,
  BLANK_POINT_ID,
  MAX_DATE_TO,
  POINT_TYPE
};
