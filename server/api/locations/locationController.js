'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('../utils/helpers');

var config = null;
fs.access(path.join(__dirname, '../../config/apiKeys.js'), function(err) {
  if (!err) {
    config = require('../../config/apiKeys.js');
  }
});

exports.get = (req, res) => {
  // Google Maps endpoint
  const api = {
    key: process.env.GOOGLEPLACEAPIKEY || config.googleMapsAPIKey,
    url: 'https://maps.googleapis.com/maps/api/',
    endPoint: 'place/autocomplete/json'
  };

  // endpoint query options
  const queryOptions = {
    input: req.params.locationPartial,
    types: '(cities)'
  };

  utils.fetch(api, queryOptions)
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
    });
};
