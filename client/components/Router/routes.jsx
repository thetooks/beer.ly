import React from 'react';
import App from '../App/App';
import Home from '../Home/Home';
import City from '../City/City';
import Brewery from '../Brewery/Brewery';
import Checkout from '../Checkout/Checkout';
import BreweryMap from '../BreweryMap/BreweryMap.jsx';

import { Route, IndexRoute } from 'react-router';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/map" component={BreweryMap} />
    <Route path="/city/:city" component={City} />
    <Route path="/city/:city/brewery/:brewery" component={Brewery} />
  </Route>
);
