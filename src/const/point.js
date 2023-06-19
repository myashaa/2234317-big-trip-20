const MAX_DATE_TO = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

const PointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const BLANK_POINT_ID = '-1';
const BLANK_POINT = {
  id: BLANK_POINT_ID,
  basePrice: '1',
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: '',
  isFavorite: false,
  offers: [],
  type: PointType.TAXI
};

export {
  BLANK_POINT,
  BLANK_POINT_ID,
  MAX_DATE_TO,
  PointType
};
