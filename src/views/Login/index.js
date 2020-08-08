import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  withStyles, Box, Avatar, Button,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { startAuthRequest, authFailure, selectors } from '../../auth';

import { googleAuthSuccess } from '../../auth/asyncActions';
import history from '../../providers/routing/app-history';
import Spacer from '../../components/Spacer';


import { Container } from '@material-ui/core';

const styles = () => ({});

const LoginPage = ({
  authToken,
  authError,
  authPending,
  actions,
  theme,
  location,
}) => {
  const onGoogleLogin = (googleResponse) => actions.googleAuthSuccess(googleResponse);

  const onGoogleLoginError = (error) => actions.authFailure(error.error);

  const onGoogleLoginRequest = () => actions.startAuthRequest();

  useEffect(() => {
    if (authToken) {
      /* eslint-disable no-restricted-globals */
      const { state: locationState } = location;
      const redirectTo = locationState && locationState.from !== null
        ? locationState.from
        : '/home';
      history.push(redirectTo);
    }
  }, [authToken]);

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Box
          style={{
            marginTop: '30vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            style={{
              backgroundColor: theme.palette.secondary.main,
              margin: theme.spacing(2),
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          {authError && (
            <Alert severity="error">
              {'Google sign in error. Error code — '}
              {authError}
            </Alert>
          )}
          <Spacer height={theme.spacing(2)} />
          <GoogleLogin
            clientId="34917283366-b806koktimo2pod1cjas8kn2lcpn7bse.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={onGoogleLogin}
            onFailure={onGoogleLoginError}
            onRequest={onGoogleLoginRequest}
            scope="profile email"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                variant="contained"
                size="large"
                color="primary"
                disabled={authPending}
              >
                Login with NG ID
              </Button>
            )}
            cookiePolicy="single_host_origin"
          />
        </Box>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  authToken: selectors.selectAuthToken(state),
  authPending: selectors.selectAuthPending(state),
  authError: selectors.selectAuthError(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { startAuthRequest, authFailure, googleAuthSuccess },
    dispatch,
  ),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(LoginPage);
