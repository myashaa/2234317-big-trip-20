import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const TIME_IN_MIN = 'mm[m]';
const TIME_IN_HOUR_MIN = 'HH[h] mm[m]';
const TIME_IN_DAY_HOUR_MIN = 'DD[d] HH[h] mm[m]';

const COUNT_OF_MS_IN_DAY = 86400000;
const COUNT_OF_MS_IN_HOUR = 3600000;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDuration(dateFrom, dateTo) {
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

export {
  DATE_FORMAT,
  TIME_FORMAT,
  getRandomArrayElement,
  getRandomInteger,
  humanizeDate,
  getDuration
};
