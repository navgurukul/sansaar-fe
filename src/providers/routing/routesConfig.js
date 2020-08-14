import React from 'react'; // eslint-disable-line no-unused-vars
import LoginPage from '../../views/Login';
import UsersSection from '../../views/Users';
import PathwaysSection from '../../views/Pathways';

const ROUTES = [
  {
    path: '/',
    exact: true,
    component: LoginPage,
    key: 'ROOT'
  },
  {
    path: '/login',
    exact: true,
    key: 'LOGIN_PAGE',
    component: LoginPage
  },
  {
    path: '/users',
    auth: true,
    key: 'USERS_SECTION',
    component: UsersSection,
  },
  {
    path: '/pathways',
    auth: true,
    key: 'PATHWAYS_SECTION',
    component: PathwaysSection,
  }
]

export default ROUTES;