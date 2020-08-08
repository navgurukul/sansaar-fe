import React from 'react';
import LoginPage from '../../views/Login';
import UsersSection from '../../views/Users';


const ROUTES = [
  {
    path: '/users',
    component: UsersSection,
  },
  {
    path: '/login',
    component: LoginPage
  },
]

export default ROUTES;