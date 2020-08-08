import React from 'react';

import { UserAuthContext } from './index';

const withUserContext = (Component) => {
  return (props) => (
    <UserAuthContext.Consumer>
      {context => <Component {...props} userContext={context} />}
    </UserAuthContext.Consumer>
  );
}

export default withUserContext;