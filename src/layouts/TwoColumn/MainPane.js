import React, { useEffect } from 'react';
import { withStyles, Box } from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'clsx';

import RoutesFromList from '../../providers/routing/RoutesFromList';
import RightPaneWrapper from './RightPaneWrapper';
import { selectors, setMainPaneWidth } from './store';

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
  toolbarOffset: theme.mixins.toolbar,
  mainPaneAfterRightOpen: {
    [theme.breakpoints.up('md')]: {
      width: '70vw',
    }
  }
});

const MainPane = ({ actions, rightPaneOpen, classes, routes, location }) => {

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
    <Box className={classNames(classes.mainPane, { [classes.mainPaneAfterRightOpen]: rightPaneOpen })} ref={mainPaneRef}>
      <RoutesFromList routes={routes} />
      <Box className={classes.toolbarOffset} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setMainPaneWidth }, dispatch),
});

const mapStateToProps = (state) => ({
  rightPaneOpen: selectors.selectRightPaneOpen(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(MainPane);