const createEntry = (brewery) => {
  var entry = { //eslint-disable-line
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [brewery.longitude, brewery.latitude]
    },
    properties: {
      title: brewery.brewery.name,
      icon: 'beer'
    }
  };
  return entry;
};

const createGeoJSON = (breweryList) => {
  const geoData = [];

  for (let i = 0; i < breweryList.length; i++) {
    geoData.push(createEntry(breweryList[i]));
  }

  const JSONData = {'id': 'points',
    'type': 'symbol',
    'source': {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': geoData
      }
    },
    'layout': {
      'icon-image': '{icon}-15',
      'text-field': '{title}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': 9,
      'text-offset': [0, -0.6],
      'text-anchor': 'bottom',
      'text-optional': true
    }
  };

  return JSONData;
};

export default createGeoJSON;
