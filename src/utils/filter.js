import {
  isDateInFuture,
  isDateInPresent,
  isDateInPast
} from '../utils/date.js';
import {FilterType} from '../const/filter.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateInFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isDateInPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isDateInPast(point.dateTo))
};

export {filter};
