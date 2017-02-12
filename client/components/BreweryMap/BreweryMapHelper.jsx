const helper = {
  createEntry(brewery) {
    var description = brewery.brewery.description || ''; //eslint-disable-line
    var html = //eslint-disable-line
      `<div class="popup">
        <img src=${brewery.brewery.images.icon}>\n
        <br>
        <a href=${brewery.brewery.website} target="_blank"><h3>${brewery.brewery.name}</h3></a>
        <p>${description.slice(0, 139) + '...'}</p>
      </div>
      <style>
        h3 { color: black; }
        img { float: right; }
        div .popup { padding: 1.5em; }
      </style>`;

    var entry = { //eslint-disable-line
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [brewery.longitude, brewery.latitude]
      },
      properties: {
        name: brewery.brewery.name,
        nameShortDisplay: brewery.brewery.nameShortDisplay,
        html: html,
        icon: 'beer'
      }
    };
    return entry;
  },

  findCenter(breweryList) {
    let lng = 0;
    let lat = 0;
    const len = breweryList.length;
    breweryList.forEach((brewery) => {
      lng += brewery.longitude;
      lat += brewery.latitude;
    });
    return [lng / len, lat / len];
  },

  createGeoJSON(breweryList) {
    const geoData = [];
console.log(breweryList[0]);
    for (let i = 0; i < breweryList.length; i++) {
      if (breweryList[i].brewery.images) {
        geoData.push(this.createEntry(breweryList[i]));
      }
    }

    const JSONData = {
      id: 'pins',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: geoData
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'text-field': '{nameShortDisplay}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'icon-allow-overlap': true,
        'text-size': 12,
        'text-offset': [0, -0.6],
        'text-anchor': 'bottom',
        'text-optional': true
      }
    };

    return JSONData;
  }
};

export default helper;
