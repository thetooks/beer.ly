/*
This file uses lazy script loading for Mapbox instead of the Mapbox GL module.
*/

import React from 'react';
import helper from './BreweryMapHelper.jsx';
import {ReactScriptLoaderMixin} from 'react-script-loader';

const BreweryMap = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  createMap(breweries) {
    mapboxgl.accessToken = 'pk.eyJ1IjoicndodWJlciIsImEiOiJjaXl4djZndWEwMDcxMnFtczk4Y25xeDcxIn0.jUB7Uxo3IZ51Nri9WIRFJw'; //eslint-disable-line

    const map = new mapboxgl.Map({ //eslint-disable-line
      container: 'map',
      center: helper.findCenter(breweries),
      zoom: 11,
      style: 'mapbox://styles/mapbox/streets-v9'
    });

    map.on('load', () => {
      map.addLayer(helper.createGeoJSON(breweries));
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, {layers: ['pins']});

      if (!features.length) {
        return;
      }
      const feature = features[0];

      new mapboxgl.Popup({ //eslint-disable-line
        anchor: 'bottom',
        offset: [0, -1.5]
      }) //eslint-disable-line
      .setLngLat(feature.geometry.coordinates)
      .setHTML(feature.properties.html)
      .addTo(map);
    });

    map.addControl(new mapboxgl.NavigationControl()); //eslint-disable-line

    return map;
  },

  getScriptURL() {
    return 'https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js';
  },

  onScriptLoaded() {
    const map = this.createMap(this.props.breweries); //eslint-disable-line
    return map;
  },

  onScriptError() {
    console.log('Loading Error in React Script Loader'); //eslint-disable-line
  },

  render() {
    return (
      <div id="map"></div>
    );
  }
});

export default BreweryMap;
