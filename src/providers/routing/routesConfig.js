import React from 'react'; // eslint-disable-line no-unused-vars
import LoginPage from '../../views/Login';
import UsersSection from '../../views/Users';

const ROUTES = [
  {
    path: '/',
    exact: true,
    component: LoginPage,
    key: 'ROOT'
  },
  {
    path: '/users',
    auth: true,
    key: 'USERS_SECTION',
    component: UsersSection,
  },
  {
    path: '/login',
    exact: true,
    key: 'LOGIN_PAGE',
    component: LoginPage
  },
]

export default ROUTES;