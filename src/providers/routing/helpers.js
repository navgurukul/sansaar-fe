import React from 'react';
import { Route, Switch } from 'react-router-dom';

const renderRouteFromObj = ({ component: Component, WrapComponent, ...route }, key) => {
  const props = { ...route };
  if (Component) {
    props.component = WrapComponent ? () => <WrapComponent><Component/></WrapComponent> : Component;
  }
  return <Route {...props} key={key} />
}

const renderRoutes = (routes, WrapComponent) => {
  return (
    <Switch>
      {routes.map((route, i) => renderRouteFromObj({ ...route, WrapComponent }, i))}
    </Switch>
  );
}

module.exports = { renderRouteFromObj, renderRoutes };