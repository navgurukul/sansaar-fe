import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, withStyles, Button } from '@material-ui/core';
import { compose } from 'recompose';

import TwoColumnLayout from '../../layouts/TwoColumn';

const styles = () => ({});

const UsersSection = ({ theme }) => {

  const userList = () => (
    <Box>
      {'List of users comes here.'}
      <br />
      <br />
      <Link to="/users/add">Add a user</Link>
    </Box>
  );

  const mainPaneRoutes = [
    {
      path: '/users/detail/add',
      component: () => (<Box style={{ padding: theme.spacing(2) }}>{'Detailed add'}</Box>),
      exact: false,
    },
    {
      path: '/users',
      exact: false,
      component: userList
    },
  ];

  const rightPaneRoutes = [
    {
      path: '/users/add',
      component: () => <Link to="/users">Close</Link>,
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