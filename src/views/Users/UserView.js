import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Box, withStyles, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { compose } from "recompose";
import moment from 'moment';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UserAvatar from './components/UserCard/UserAvatar';
import UserRoleChips from './components/UserCard/UserRoleChips';
import Spacer from '../../components/Spacer';

import { selectors, setUserToView, setUserRolesList } from './store';
import { ngFetch } from "../../providers/NGFetch";
import history from "../../providers/routing/app-history";

const styles = () => ({
  avatarContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  closeBtn: {
    float: 'right',
  }
});

function UserView({ match, classes, theme, actions, user }) {

  const {userId} = match.params;
  const [userLoading, setUserLoading] = React.useState(true);
  useEffect(() => {
    setUserLoading(true);
    const fetchData = async () => {
      const response = await ngFetch(`/users/${userId}`);
      actions.setUserToView(response.user);
      setUserLoading(false);
    }
    fetchData();
  }, [userId]);

  const handleClose = () => history.push('/users');

  if (userLoading) {
    return <Box>Loading</Box>;
  }

  return (
    <React.Fragment>
      <Box>
        <IconButton className={classes.closeBtn} onClick={handleClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Box className={classes.avatarContainer}>
        <UserAvatar name={user.name} profilePicture={user.profile_picture} widthHeight={200} />
      </Box>
      <Spacer height={theme.spacing(2)} />
      <Typography variant="overline">NAME</Typography>
      <Typography variant="body1">{user.name}</Typography>
      <Spacer height={theme.spacing(1)} />
      <Typography variant="overline">E-MAIL</Typography>
      <Typography variant="body1">{user.email}</Typography>
      <Spacer height={theme.spacing(1)} />
      <Typography variant="overline">GOOGLE USER ID</Typography>
      <Typography variant="body1">{user.google_user_id}</Typography>
      <Spacer height={theme.spacing(1)} />
      <Typography variant="overline">JOINED</Typography>
      <Typography variant="body1">{moment(user.createdAt).fromNow()}</Typography>
      <Spacer height={theme.spacing(1)} />
      <Typography variant="overline">ROLES</Typography>
      <UserRoleChips rolesList={user.rolesList} edit userId={user.id} setUserRolesList={actions.setUserRolesList} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: selectors.selectUserToView(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setUserToView, setUserRolesList }, dispatch)
});

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(UserView);