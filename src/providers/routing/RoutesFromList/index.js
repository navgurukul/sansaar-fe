import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import withUserContext from '../../UserAuth/withUserContext';
import { compose } from 'recompose';
import NGRoute from './NGRoute';

const RoutesFromList = ({ routes, WrapComponent, userContext, location }) => {

  const renderRouteFromObj = ({ component: Component, WrapComponent, auth, ...route }, key) => {
    if (auth && !userContext.authorized) {
      return <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
    }
    const props = { ...route };
    if (Component) {
      props.component = WrapComponent ? () => <WrapComponent><Component/></WrapComponent> : Component;
    }
    return <Route {...props} key={key} />
  }

  return (
    <Switch>
      { routes.map((route, i) => <NGRoute {...route} WrapComponent={WrapComponent} key={i} />) }
    </Switch>
  );
}

export default compose(
  withUserContext,
  withRouter,
)(RoutesFromList);