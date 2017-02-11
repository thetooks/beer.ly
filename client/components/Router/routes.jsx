import React from 'react';
import App from '../App/App';
import Home from '../Home/Home';
import City from '../City/City';
import Brewery from '../Brewery/Brewery';
import Checkout from '../Checkout/Checkout';

import { Route, IndexRoute } from 'react-router';
import AuthService from '../../../server/auth/AuthService';

const auth = new AuthService('SrAe7FbHmv6Y6kuTJEIbxEyDdwL2N0L7', 'awattny.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' });
  }
};

module.exports = (
  <Route path="/" component={App} auth={auth}>
    <IndexRoute component={Home} />
    <Route path="/checkout" component={Checkout} onEnter={requireAuth} />
    <Route path="/city/:city" component={City} />
    <Route path="/city/:city/brewery/:brewery" component={Brewery} />
  </Route>
);
