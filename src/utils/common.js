function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function insertDashIntoStr (str) {
  return str.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, '').replace(/\s/g, '-');
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {
  getRandomArrayElement,
  getRandomInteger,
  insertDashIntoStr,
  updateItem
};
