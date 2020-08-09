import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  withStyles,
  IconButton,
  Box,
  Typography,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NGLogo from '../../../assets/img/logoWhite.png';
import { logOutAction } from '../../../auth'
import withUserContext from '../../../providers/UserAuth/withUserContext';
import history from '../../../providers/routing/app-history';

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

const getInitials = (name) => {
  const tokens = name.split(' ').map(t => t[0]);
  return tokens.join('');
}

const NGAppBar = ({
  classes,
  userContext,
  actions,
  toggleDrawer = () => {},
}) => {

  const { user, authorized } = userContext;

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const profileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleAvatarClick = (event) => {
    setProfileMenuAnchorEl(event.target);
  }

  const handleLogout = () => {
    handleProfileMenuClose();
    actions.logout();
    history.push('/login');
  }

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        {authorized && (
        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
)}
        <Box className={classes.logoContainer}>
          <img src={NGLogo} className={classes.logoImg} alt="NavGurukul Logo" />
          <Box className={classes.ngServiceNameContainer}>
            <Typography variant="h6" style={{ fontWeight: 100 }}>
              Admissions
            </Typography>
          </Box>
        </Box>
        {authorized && (
          <Box>
            <IconButton color="inherit" onClick={handleAvatarClick}>
              <Avatar src={user.profile_picture ? user.profile_picture : undefined}>
                {!user.profile_picture && getInitials(user.name)}
              </Avatar>
            </IconButton>
            <Menu
              id="user-avatar-menu"
              anchorEl={profileMenuAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={profileMenuOpen}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logout: logOutAction }, dispatch)  
});

export default compose(
  withUserContext,
  connect(null, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(NGAppBar);
