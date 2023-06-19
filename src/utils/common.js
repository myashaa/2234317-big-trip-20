function insertDashIntoStr (str) {
  return str.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, '').replace(/\s/g, '-');
}

export {insertDashIntoStr};
