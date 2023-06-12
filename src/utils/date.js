import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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
  const differenceInMs = dayjs.extend(duration).duration(difference).$ms;
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

export {
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  humanizeDate,
  getDuration,
  isDateInFuture,
  isDateInPresent,
  isDateInPast
};
