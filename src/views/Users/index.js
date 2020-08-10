import React from 'react';
import { Link } from 'react-router-dom';
import { Box, withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import TwoColumnLayout from '../../layouts/TwoColumn';
import UsersList from './UsersList';
import UserEdit from './UserEdit';
const styles = () => ({});

const UsersSection = ({theme}) => {

  console.log(theme);

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
      component: UsersList,
      key: 'USERS_LIST',
    },
  ];

  const rightPaneRoutes = [
    {
      path: '/users/add',
      component: () => <Link to="/users">Close</Link>,
      key: 'USERS_ADD',
      exact: true,
    },
    {
      path: '/users/edit/userid',
      component: UserEdit,
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