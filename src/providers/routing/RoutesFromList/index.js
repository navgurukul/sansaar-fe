import React from 'react';
import { Switch } from 'react-router-dom';

import NGRoute from './NGRoute';

const RoutesFromList = ({ routes, WrapComponent }) => (
  <Switch>
    { routes.map((route) => <NGRoute {...route} WrapComponent={WrapComponent} key={route.key} />) }
  </Switch>
);

export default RoutesFromList;