import React, { useEffect } from 'react';
import { withStyles, Box } from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'clsx';

import RoutesFromList from '../../providers/routing/RoutesFromList';
import { selectors, setMainPaneWidth, setMainPaneScrollToTopPending } from './store';

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

const MainPane = ({
  actions,
  rightPaneOpen,
  classes,
  routes,
  mainPaneScrollToTopPending
}) => {

  const mainPaneRef = React.createRef();

  // set main width on url change
  useEffect(() => {
    actions.setMainPaneWidth(mainPaneRef.current.offsetWidth);
  }, [rightPaneOpen,mainPaneRef,actions]);

  // scroll the main pane to top if marked as pending
  useEffect(() => {
    if (!mainPaneScrollToTopPending) {
      return;
    }
    mainPaneRef.current.scrollTo(0,0);
    actions.setMainPaneScrollToTopPending(false);
  }, [mainPaneScrollToTopPending,actions,mainPaneRef])

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
  actions: bindActionCreators({ setMainPaneWidth, setMainPaneScrollToTopPending }, dispatch),
});

const mapStateToProps = (state) => ({
  rightPaneOpen: selectors.selectRightPaneOpen(state),
  mainPaneScrollToTopPending: selectors.selectMainPaneScrollToTopPending(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(MainPane);