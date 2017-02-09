import React from 'react';
import styles from './BreweryMap.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoicndodWJlciIsImEiOiJjaXl4djZndWEwMDcxMnFtczk4Y25xeDcxIn0.jUB7Uxo3IZ51Nri9WIRFJw';


class BreweryMap extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    return (
      {map}
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <h1>Test</h1>
          <div id="map"></div>
        </div>
      </div>
    );
  }
}

export default BreweryMap;
