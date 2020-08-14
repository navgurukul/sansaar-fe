import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Box, withStyles, Typography, IconButton } from "@material-ui/core";
import { compose } from "recompose";
import moment from 'moment';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import RightPaneWithTitle from '../../components/RightPaneWithTitle';
import UserAvatar from './components/UserCard/UserAvatar';
import UserRoleChips from './components/UserCard/UserRoleChips';
import Spacer from '../../components/Spacer';
import history from "../../providers/routing/app-history";
import { selectors, setUserToView, setUserRolesList } from './store';
import { setRightPaneLoading, selectors as layoutSelectors } from '../../layouts/TwoColumn/store';
import { ngFetch } from "../../providers/NGFetch";

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

function UserView({ match, classes, theme, actions, user, rightPaneLoading }) {

  const { userId } = match.params;
  const [userLoading, setUserLoading] = React.useState(true);
  useEffect(() => {
    setUserLoading(true);
    const fetchData = async () => {
      actions.setRightPaneLoading(true);
      const response = await ngFetch(`/users/${userId}`);
      actions.setUserToView(response.user);
      setUserLoading(false);
      actions.setRightPaneLoading(false);
    }
    fetchData();
  }, [userId]);

  const handleClose = () => history.push('/users');

  if (rightPaneLoading || !user) {
    return <React.Fragment />;
  }

  return (
    <RightPaneWithTitle closeLink="/users">
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
    </RightPaneWithTitle>
  )
}

const mapStateToProps = (state) => ({
  user: selectors.selectUserToView(state),
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setUserToView, setUserRolesList, setRightPaneLoading }, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(UserView);