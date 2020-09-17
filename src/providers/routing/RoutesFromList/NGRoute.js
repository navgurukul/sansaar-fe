import React from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import { compose } from 'recompose';

import withUserContext from '../../UserAuth/withUserContext';

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

  let renderMethod = null;
  if (Component) {
    if (WrapComponent) {
      renderMethod = () => (
        <WrapComponent>
          <Component />
        </WrapComponent>
      );
    } else {
      props.component = Component;
    }
  }
  return <Route {...props} render={renderMethod} />;
};

export default compose(
  withRouter,
  withUserContext,
)(NGRoute);
