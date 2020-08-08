import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './app-history';
import ROUTES from './routesConfig';
// import LoggedInLayout from '../../layouts/LoggedIn';
import HeaderWithDrawer from '../../layouts/HeaderWithDrawer';
import { renderRoutes } from './helpers';

const AppRouter = () => (
  <React.Fragment>
    <Router history={history}>
      <HeaderWithDrawer />
      { renderRoutes(ROUTES) }
    </Router>
  </React.Fragment>
);

export default AppRouter;
