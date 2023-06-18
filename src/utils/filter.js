import {FILTER_TYPE} from '../const/filter.js';
import {
  isDateInFuture,
  isDateInPresent,
  isDateInPast
} from '../utils/date.js';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => [...points],
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isDateInFuture(point.dateFrom)),
  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) => isDateInPresent(point.dateFrom, point.dateTo)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isDateInPast(point.dateTo)),
};

export {filter};
