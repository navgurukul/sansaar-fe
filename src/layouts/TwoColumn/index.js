import React, { useEffect } from 'react';
import { withStyles, Box } from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import RoutesFromList from '../../providers/routing/RoutesFromList';
import { selectors, setMainPaneWidth } from './store';
import { connect } from 'react-redux';


const styles = (theme) => ({
  mainPane: {
    position: 'fixed',
    height: '100vh',
    padding: theme.spacing(2),
    width: '100vw',
    overflow: 'scroll',
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
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      width: '30vw',
      left: '70vw',
    }
  },
  toolbarOffset: theme.mixins.toolbar
});

const TwoColumnLayout = ({
  classes,
  mainPaneRoutes,
  rightPaneRoutes,
  location,
  mainPaneWidth,
  actions,
}) => {

  const RightPaneWrapper = ({children}) => <Box className={classes.rightPane}>{children}</Box>;

  const mainPaneRef = React.createRef();

  useEffect(() => {
    actions.setMainPaneWidth(mainPaneRef.current.offsetWidth);
  }, [location]);

  useEffect(() => {
    const setMainPaneWidth = () => actions.setMainPaneWidth(mainPaneRef.current.offsetWidth);
    window.addEventListener('resize', setMainPaneWidth);
    return function cleanup() {
      window.removeEventListener('resize', setMainPaneWidth);
    }
  });

  return (
    <React.Fragment>
      <Box className={classes.mainPane} ref={mainPaneRef}>
        <RoutesFromList routes={mainPaneRoutes} />
        <Box className={classes.toolbarOffset} />
      </Box>
      <RoutesFromList routes={rightPaneRoutes} WrapComponent={RightPaneWrapper} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  mainPaneWidth: selectors.selectMainPaneWidth(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setMainPaneWidth }, dispatch),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(TwoColumnLayout);