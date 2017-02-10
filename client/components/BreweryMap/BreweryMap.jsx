// import React from 'react';
// import styles from './BreweryMap.css';
// import mapboxgl from 'mapbox-gl';
// import createGeoJSON from './geoJSONHelper.jsx';
// mapboxgl.accessToken = 'pk.eyJ1IjoicndodWJlciIsImEiOiJjaXl4djZndWEwMDcxMnFtczk4Y25xeDcxIn0.jUB7Uxo3IZ51Nri9WIRFJw';


// class BreweryMap extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   componentWillReceiveProps(nextProps) {
//     const map = new mapboxgl.Map({
//       container: 'map',
//       center: [nextProps.breweries[0].longitude, nextProps.breweries[0].latitude],
//       zoom: 11,
//       style: 'mapbox://styles/mapbox/streets-v9',
//       // scrollZoom: false
//     });

//     map.on('load', () => {
//       map.addLayer(createGeoJSON(nextProps.breweries));
//     });

//     map.addControl(new mapboxgl.NavigationControl());

//     return (
//       {map}
//     );
//   }

//   render() {
//     return (
//       <div className={styles.wrapper}>
//         <div className={styles.heading}>
//           <div id="map">
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default BreweryMap;
