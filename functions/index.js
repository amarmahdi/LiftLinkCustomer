const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { geocodeRequest, directionsRequest } = require("./geocode");
const { Client } = require("@googlemaps/google-maps-services-js");
const cors = require("cors");

const corsHandler = cors({ origin: true }, (req, res) => {
  console.log("CORS")
  res.set("Access-Control-Allow-Origin", "*");
});
const client = new Client({});

exports.geocode = onRequest((request, response) => {
  corsHandler(request, response, () => {
    geocodeRequest(request, response, client);
  });
});

exports.places = onRequest((request, response) => {
  corsHandler(request, response, () => {
    placesRequest(request, response, client);
  });
});

exports.directions = onRequest((request, response) => {
  corsHandler(request, response, () => {
    directionsRequest(request, response, client);
  });
});
