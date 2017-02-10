import React from 'react';
import styles from './BreweryMap.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoicndodWJlciIsImEiOiJjaXl4djZndWEwMDcxMnFtczk4Y25xeDcxIn0.jUB7Uxo3IZ51Nri9WIRFJw';


class BreweryMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    const map = new mapboxgl.Map({
      container: 'map',
      center: [nextProps.breweries[0].longitude, nextProps.breweries[0].latitude],
      zoom: 11,
      style: 'mapbox://styles/mapbox/streets-v9',
      // scrollZoom: false
    });

    const data = this.createGeoJSON(nextProps.breweries);

    map.on('load', () => {
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': data
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
      });
    });

    map.addControl(new mapboxgl.NavigationControl());

    return (
      {map}
    );
  }

  createGeoJSON(breweryList) {
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

    const geoData = [];
    for (let i = 0; i < breweryList.length; i++) {
      geoData.push(createEntry(breweryList[i]));
    }

    return geoData;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <div id="map">
          </div>
        </div>
      </div>
    );
  }
}

export default BreweryMap;
