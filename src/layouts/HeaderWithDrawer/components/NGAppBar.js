import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  AppBar,
  withStyles,
  IconButton,
  Box,
  Typography,
  Toolbar,
} from '@material-ui/core';

import NGLogo from '../../../assets/img/logoWhite.png';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logoContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    height: 40,
    width: 158,
  },
  ngServiceNameContainer: {
    marginLeft: theme.spacing(1),
  },
});

const NGAppBar = ({ classes, toggleDrawer = () => {} }) => (
  <AppBar position="sticky" className={classes.appBar}>
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Box className={classes.logoContainer}>
        <img src={NGLogo} className={classes.logoImg} alt="NavGurukul Logo" />
        <Box className={classes.ngServiceNameContainer}>
          <Typography variant="h6" style={{ fontWeight: 100 }}>
            Admissions
          </Typography>
        </Box>
      </Box>
      <IconButton color="inherit">
        <ExitToAppIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles, { withTheme: true })(NGAppBar);
