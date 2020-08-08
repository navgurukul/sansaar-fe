import React from 'react';
import LoginPage from '../../views/Login';
import UsersSection from '../../views/Users';


const ROUTES = [
  {
    path: '/',
    exact: true,
    component: LoginPage
  },
  {
    path: '/users',
    auth: true,
    component: UsersSection,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage
  },
]

export default ROUTES;