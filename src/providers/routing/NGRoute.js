import React from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import { compose } from 'recompose';

import withUserContext from '../UserAuth/withUserContext';

const NGRoute = ({
  component: Component,
  WrapComponent,
  auth,
  userContext,
  location,
  ...route
}) => {
  if (auth && !userContext.authorized) {
    return <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />;
  }
  const props = { ...route };
  if (Component) {
    props.component = WrapComponent ? () => <WrapComponent><Component/></WrapComponent> : Component;
  }
  return <Route {...props} />;
}

export default compose(
  withRouter,
  withUserContext,
)(NGRoute);
