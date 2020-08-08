import React from 'react';
import { withStyles, Box } from '@material-ui/core';

import { renderRoutes } from '../providers/routing/helpers';

const styles = (theme) => ({
  mainPane: {
    backgroundColor: '#6b6b6b',
    position: 'fixed',
    height: '100vh',
    padding: theme.spacing(2),
    width: '100vw',
    zIndex: 0,
    [theme.breakpoints.up('md')]: {
      minWidth: '70vw',
    }
  },
  rightPane: {
    position: 'fixed',
    height: '100vh',
    padding: theme.spacing(2),
    width: '100vw',
    zIndex: 10,
    background: '#fff',
    [theme.breakpoints.up('md')]: {
      width: '30vw',
      left: '70vw',
    }
  },
});

const TwoColumnLayout = ({ classes, mainPaneRoutes, rightPaneRoutes}) => {

  const RightPaneWrapper = ({children}) => {
    return <Box className={classes.rightPane}>{children}</Box>
  }

  return (
    <React.Fragment>
      <Box className={classes.mainPane}>
        { renderRoutes(mainPaneRoutes) }
      </Box>
      { renderRoutes(rightPaneRoutes, RightPaneWrapper) }

    </React.Fragment>
  );
};

export default withStyles(styles, {withTheme: true})(TwoColumnLayout);