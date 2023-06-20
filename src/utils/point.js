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
  const pointOffers = allOffers.find((item) => item.type === pointType);
  return (pointOffers) ? pointOffers.offers : [];
}

export {
  isPriceEqual,
  getDestinationById,
  getDestinationByName,
  getOffers
};
