import {
  getDateDifference,
  getTimeDifference
} from '../utils/date.js';
import {SortType} from '../const/sort.js';

function sortByDate(pointA, pointB) {
  return getDateDifference(pointA, pointB);
}

function sortByTime(pointA, pointB) {
  return getTimeDifference(pointA, pointB);
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sort(items, sortType) {
  switch (sortType) {
    case SortType.TIME.NAME:
      items.sort(sortByTime);
      break;
    case SortType.PRICE.NAME:
      items.sort(sortByPrice);
      break;
    default:
      items.sort(sortByDate);
  }
}

export {sort};
