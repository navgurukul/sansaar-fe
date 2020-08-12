import React from 'react';
import TwoColumnLayout from '../../layouts/TwoColumn';
import UsersList from './UsersList';
import UserView from './UserView';

const UsersSection = () => {

  const mainPaneRoutes = [
    {
      path: '/users',
      exact: false,
      component: UsersList,
      key: 'USERS_LIST',
    },
  ];

  const rightPaneRoutes = [
    {
      path: '/users/:userId',
      exact: true,
      component: UserView,
      key: 'USERS_VIEW',
    }
  ];

  return (
    <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
  );
};


export default UsersSection;