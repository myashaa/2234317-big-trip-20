import {
  DESTINATION_DESCRIPTION,
  DESTINATION_PHOTO_URL,
  MIN_INDEX_OF_DESTINATION_PHOTO,
  MAX_INDEX_OF_DESTINATION_PHOTO
} from '../const.js';
import {
  getRandomInteger,
  getRandomArrayElement
} from '../utils.js';

const mockDestinations = [
  {
    id: '0',
    description: getRandomArrayElement(DESTINATION_DESCRIPTION),
    name: 'Chamonix',
    pictures: [
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      }
    ]
  },
  {
    id: '1',
    description: getRandomArrayElement(DESTINATION_DESCRIPTION),
    name: 'Geneva',
    pictures: [
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      }
    ]
  },
  {
    id: '2',
    description: getRandomArrayElement(DESTINATION_DESCRIPTION),
    name: 'Amsterdam',
    pictures: [
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      },
      {
        src: `${DESTINATION_PHOTO_URL}${getRandomInteger(MIN_INDEX_OF_DESTINATION_PHOTO, MAX_INDEX_OF_DESTINATION_PHOTO)}`,
        description: getRandomArrayElement(DESTINATION_DESCRIPTION)
      }
    ]
  }
];

function getRandomDestination() {
  return getRandomArrayElement(mockDestinations);
}

export {
  getRandomDestination,
  mockDestinations
};
