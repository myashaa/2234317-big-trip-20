function isPriceEqual(priceA, priceB) {
  return (priceA - priceB) === 0;
}

function getDestinationById(allDestinations, pointDestination) {
  return allDestinations.find((item) => pointDestination.includes(item.id));
}

function getDestinationByName(allDestinations, pointDestination) {
  return allDestinations.find((item) => pointDestination.includes(item.name));
}

function getOffers(allOffers, pointType) {
  return allOffers.find((item) => item.type === pointType).offers;
}

export {
  isPriceEqual,
  getDestinationById,
  getDestinationByName,
  getOffers
};
