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

function fetchBreweriesByLocation(city) {
  const api = {
    key: process.env.BREWERYDBKEY || config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: 'locations/'
  };

  const queryOptions = {
    // locality: 'San Francisco'
    locality: city,
    p: '1',
    isPrimary: 'Y',
    order: 'breweryName'
  };

  return utils.fetch(api, queryOptions);
}

exports.get = (req, res) => {
  const city = req.params.location;
  fetchBreweriesByLocation(city)
    .then((response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
