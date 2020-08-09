import React from 'react';
import { Link } from 'react-router-dom';
import { Box, withStyles } from '@material-ui/core';
import { compose } from 'recompose';

import TwoColumnLayout from '../../layouts/TwoColumn';

const styles = () => ({});

const UsersSection = ({ theme }) => {

  const userList = () => (
    <Box>
      List of users comes here.
      <br />
      <br />
      <Link to="/users/add">Add a user</Link>
    </Box>
  );

  const mainPaneRoutes = [
    {
      path: '/users/detail/add',
      component: () => (<Box style={{ padding: theme.spacing(2) }}>Detailed add</Box>),
      key: 'DETAIL_USER_ADD',
      exact: false,
    },
    {
      path: '/users',
      exact: false,
      key: 'USERS_LIST',
      component: userList
    },
  ];

  const rightPaneRoutes = [
    {
      path: '/users/add',
      component: () => <Link to="/users">Close</Link>,
      key: 'USERS_ADD',
      exact: true,
    }
  ];

  return (
    <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
  );
};

export default compose(
  withStyles(styles, { withTheme: true })
)(UsersSection);