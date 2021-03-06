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

function fetchBreweryByName(name) {
  const api = {
    key: process.env.BREWERYDBKEY || config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: 'breweries/'
  };

  const queryOptions = {
    // name: 'Fort Point Brewing Company'
    name: name
  };

  return utils.fetch(api, queryOptions);
}

function fetchBeersByBreweryId(breweryID) {
  const api = {
    key: process.env.BREWERYDBKEY || config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: `brewery/${breweryID}/beers/`
  };

  return utils.fetch(api, {});
}

exports.get = (req, res) => {
  const name = req.params.brewery;

  fetchBreweryByName(name)
    .then((response) => {
      const breweryID = response.data[0].id;
      return fetchBeersByBreweryId(breweryID);
    })
    .then((response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
