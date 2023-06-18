import {
  getDateDifference,
  getTimeDifference
} from '../utils/date.js';
import {SORT_TYPE} from '../const/sort.js';

function sortByDate(pointA, pointB) {
  return getDateDifference(pointA, pointB);
}

function sortByTime (pointA, pointB) {
  return getTimeDifference(pointA, pointB);
}

function sortByPrice (pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sort (items, sortType) {
  switch (sortType) {
    case SORT_TYPE.TIME.name:
      items.sort(sortByTime);
      break;
    case SORT_TYPE.PRICE.name:
      items.sort(sortByPrice);
      break;
    default:
      items.sort(sortByDate);
  }
}

export {sort};
