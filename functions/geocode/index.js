const { logger } = require("firebase-functions/v1");
const functions = require("firebase-functions");

module.exports.geocodeRequest = async (request, response, client) => {
  const { city, address, state } = request.query;
  const formattedAddress = `${address}, ${city}, ${state}`;
  logger.info(`Geocoding address: ${formattedAddress}`);
  await client
    .geocode({
      params: {
        address: formattedAddress,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      const { data } = res;
      const { results } = data;
      const { geometry } = results[0];
      const { location } = geometry;
      const { lat, lng } = location;
      console.log(`Geocoded address: ${data}`);
      response.json(results);
      return;
    })
    .catch((err) => {
      console.log(`Error geocoding address##############: ${err.message}`);
      response.status(500).send({ error: err.message });
      return;
    });
};

module.exports.placesRequest = async (request, response, client) => {
  const { city, address, state } = request.query;
  const formattedAddress = `${address}, ${city}, ${state}`;
  logger.info(`Geocoding address: ${formattedAddress}`);
  await client
    .geocode({
      params: {
        address: formattedAddress,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      const { data } = res;
      const { results } = data;
      const { geometry } = results[0];
      const { location } = geometry;
      const { lat, lng } = location;
      console.log(`Geocoded address: ${data}`);
      response.json(results);
      return;
    })
    .catch((err) => {
      console.log(`Error geocoding address##############: ${err.message}`);
      response.status(500).send({ error: err.message });
      return;
    });
};

module.exports.directionsRequest = async (request, response, client) => {
  const { origin, destination } = request.query;
  logger.info(`Getting directions from ${origin} to ${destination}`);
  await client
    .directions({
      params: {
        origin,
        destination,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      const { data } = res;
      console.log(`Got directions: ${data}`);
      response.json(data);
      return;
    })
    .catch((err) => {
      console.log(`Error getting directions##############: ${err.message}`);
      response.status(500).send({ error: err.message });
      return;
    });
};
