/*
This file is not used in the code.
It is intended to serve as an example for using lazy script loading for
Mapbox instead of the Mapbox GL module.
*/

import React from 'react';
import styles from './BreweryMap.css';
import { ReactScriptLoaderMixin } from 'react-script-loader';

const BreweryMap = React.createClass({
  mixins: [ReactScriptLoaderMixin],
  getInitialState() {
    return {
      scriptLoading: true,
      scriptLoadError: false,
    };
  },

  // this function tells ReactScriptLoaderMixin where to load the script from
  getScriptURL() {
    return 'https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js';
  },

  // ReactScriptLoaderMixin calls this function when the script has loaded
  // successfully.
  onScriptLoaded() {
    this.setState({scriptLoading: false, scriptLoadError: false});
    mapboxgl.accessToken = 'pk.eyJ1IjoicndodWJlciIsImEiOiJjaXl4djZndWEwMDcxMnFtczk4Y25xeDcxIn0.jUB7Uxo3IZ51Nri9WIRFJw';
    const monument = [-77.0353, 38.8895];
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: monument,
      zoom: 15
    });

    // create the popup
    const popup = new mapboxgl.Popup({offset: 25})
      .setText('Construction on the Washington Monument began in 1848.');

    // create DOM element for the marker
    const el = document.createElement('div');
    el.id = 'marker';

    // create the marker
    new mapboxgl.Marker(el, {offset:[-25, -25]})
    .setLngLat(monument)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);
    map.addControl(new mapboxgl.NavigationControl());

    return (
      {map}
    );
  },

  // ReactScriptLoaderMixin calls this function when the script has failed to load.
  onScriptError() {
    this.setState({scriptLoading: false, scriptLoadError: true});
  },

  render() {
    let message;
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
