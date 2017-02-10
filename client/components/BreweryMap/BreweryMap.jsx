/*
This file uses lazy script loading for Mapbox instead of the Mapbox GL module.
*/

import React from 'react';
import styles from './BreweryMap.css';
import createGeoJSON from './geoJSONHelper.jsx';
import { ReactScriptLoaderMixin } from 'react-script-loader';

const BreweryMap = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  componentWillReceiveProps(nextProps) {
    const map = this.createMap(nextProps.breweries);
    map.addControl(new mapboxgl.NavigationControl(nextProps.breweries)); //eslint-disable-line
  },

  createMap(breweries) {
    mapboxgl.accessToken = 'pk.eyJ1IjoicndodWJlciIsImEiOiJjaXl4djZndWEwMDcxMnFtczk4Y25xeDcxIn0.jUB7Uxo3IZ51Nri9WIRFJw'; //eslint-disable-line

    const lng = breweries[0].longitude || -122.400158;
    const lat = breweries[0].latitude || 37.788376;

    const map = new mapboxgl.Map({ //eslint-disable-line
      container: 'map',
      center: [lng, lat],
      zoom: 11,
      style: 'mapbox://styles/mapbox/streets-v9',
      // scrollZoom: false
    });

    map.on('load', () => {
      map.addLayer(createGeoJSON(breweries));
    });

    return (
      map
    );
  },

  getScriptURL() {
    return 'https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js';
  },

  onScriptLoaded() {
    const map = this.createMap();
    return map;
  },

  onScriptError() {
    console.log('Loading Error in React Script Loader'); //eslint-disable-line
  },

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <div id="map"></div>
        </div>
      </div>
    );
  }
});

export default BreweryMap;
