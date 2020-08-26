import React from 'react'; // eslint-disable-line no-unused-vars
import LoginPage from '../../views/Login';
import UsersSection from '../../views/Users';
import PathwaysSection from '../../views/Pathways';
import ParamtersSection from '../../views/ProgressTracking/Parameters';
import QuestionsSection from '../../views/ProgressTracking/Questions';
import MentorShipTree from '../../views/Pathways/MentoShipTree/MentorShipTree'

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
  },
  {
    path: '/progressTracking/parameters',
    auth: true,
    key: 'PARAMETERS_SECTION',
    component: ParamtersSection,
  },
  {
    path: '/progressTracking/questions',
    auth: true,
    key: 'QUESTIONS_SECTION',
    component: QuestionsSection,
  },
  {
    path: '/pathway/:pathwayId/mentorTree',
    auth: true,
    key: 'MENTORSHIP_TREE_SECTION',
    component: MentorShipTree,
  }
  
]

export default ROUTES;