import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import history from './app-history';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../../views/Login';
import LayoutPage from '../../views/Layout';


const AppRouter = () => (
  <Router history={history}>
      <Switch>
        <Route exact path="/" component={LayoutPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
  </Router>
);

export default AppRouter;
