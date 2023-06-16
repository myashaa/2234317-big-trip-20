import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const CURRENT_DATE = new Date();
const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const TIME_IN_MIN = 'mm[m]';
const TIME_IN_HOUR_MIN = 'HH[h] mm[m]';
const TIME_IN_DAY_HOUR_MIN = 'DD[d] HH[h] mm[m]';

const COUNT_OF_MS_IN_DAY = 86400000;
const COUNT_OF_MS_IN_HOUR = 3600000;

function humanizeDate (date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDuration (dateFrom, dateTo) {
  const difference = dayjs(dateTo).diff(dateFrom);
  const differenceInMs = dayjs.duration(difference).$ms;
  let format = TIME_IN_MIN;

  if (differenceInMs >= COUNT_OF_MS_IN_DAY) {
    format = TIME_IN_DAY_HOUR_MIN;
  } else if (differenceInMs >= COUNT_OF_MS_IN_HOUR) {
    format = TIME_IN_HOUR_MIN;
  }

  return dayjs.duration(difference).format(format);
}

function isDateInFuture (date) {
  return dayjs().isBefore(date, 'D');
}

function isDateInPresent(dateFrom, dateTo) {
  const isDateFromSameOrInPast = dayjs().isSameOrAfter(dayjs(dateFrom), 'D');
  const isDateToSameOrInFuture = dayjs().isSameOrBefore(dayjs(dateTo), 'D');

  return isDateFromSameOrInPast && isDateToSameOrInFuture;
}

function isDateInPast (date) {
  return dayjs().isAfter(date, 'D');
}

function getDateDifference (pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function getTimeDifference (pointA, pointB) {
  const pointAdifference = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBdifference = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return pointBdifference - pointAdifference;
}

export {
  CURRENT_DATE,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  humanizeDate,
  getDuration,
  isDateInFuture,
  isDateInPresent,
  isDateInPast,
  getTimeDifference,
  getDateDifference
};
