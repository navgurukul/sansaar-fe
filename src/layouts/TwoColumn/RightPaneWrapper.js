import React, { useEffect } from 'react';
import { withStyles, Box } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { setRightPaneOpen } from './store';

const styles = (theme) => ({
  rightPane: {
    position: 'fixed',
    height: '100vh',
    padding: theme.spacing(2),
    width: '100vw',
    zIndex: 10,
    background: '#fff',
    overflow: 'scroll',
    borderColor: theme.palette.grey[500],
    borderLeft: '1px solid',
    [theme.breakpoints.up('md')]: {
      width: '30vw',
      left: '70vw',
    }
  },
  toolbarOffset: theme.mixins.toolbar
});

const RightPaneWrapper = ({ classes, children, actions }) => {

  useEffect(() => {
    actions.setRightPaneOpen(true);
    return function cleanup() {
      actions.setRightPaneOpen(false);
    }
  });

  return (
    <Box className={classes.rightPane}>
      {children}
      <Box className={classes.toolbarOffset} />
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setRightPaneOpen }, dispatch)
});

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(RightPaneWrapper);