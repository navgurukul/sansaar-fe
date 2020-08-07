import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import history from './app-history';
import PrivateRoute from './PrivateRoute';

import HeaderBar from '../../components/HeaderBar';

import LoginPage from '../../views/Login';


const AppRouter = () => (
  <Router history={history}>
    <HeaderBar />
    <Container maxWidth={false}>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Container>
  </Router>
);

export default AppRouter;
