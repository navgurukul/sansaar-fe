import React from 'react';
import { Router } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';

import history from './app-history';
import ROUTES from './routesConfig';
import HeaderWithDrawer from '../../layouts/HeaderWithDrawer';
import withUserContext from '../UserAuth/withUserContext';
import RoutesFromList from './RoutesFromList';

const FullPageLoader = () => (
  <Box style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}
  >
    <CircularProgress size={100} />
  </Box>
);

const AppRouter = ({ userContext }) => {
  const showLoader = userContext.authorized && !userContext.userFetched;
  return (
    <React.Fragment>
      {showLoader ? <FullPageLoader /> : (
        <Router history={history}>
          <HeaderWithDrawer />
          <RoutesFromList routes={ROUTES} />
          {/* {renderRoutes(ROUTES)} */}
        </Router>
      )}
    </React.Fragment>
  );
}

export default withUserContext(AppRouter);
