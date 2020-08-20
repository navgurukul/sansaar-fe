import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TuneIcon from '@material-ui/icons/Tune';
import HelpIcon from '@material-ui/icons/Help';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ContactsIcon from '@material-ui/icons/Contacts';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TimelineIcon from '@material-ui/icons/Timeline';

const items = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    url: '/home',
    rolesList: ['student', 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore']
  },
  {
    text: 'Users',
    icon: <PeopleIcon />,
    url: '/users',
    dividerBelow: true,
    rolesList: [ 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore']
  },
  {
    text: 'Pathways',
    icon: <DirectionsBikeIcon />,
    url: '/pathways',
    rolesList: ['student', 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore']
  },
  {
    text: 'Progress Tracking',
    icon: <TrendingUpIcon />,
    rolesList: ['student', 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore'],
    children: [
      {
        text: 'Parameters',
        icon: <TuneIcon />,
        url: '/progressTracking/parameters',
        rolesList: [ 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore']
      },
      {
        text: 'Questions',
        icon: <HelpIcon />,
        url: '/progressTracking/questions',
        rolesList: [ 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore']
      },
      {
        text: 'My Mentees',
        icon: <ContactsIcon />,
        url: '/progressTracking/myMentees',
        rolesList: [ 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore']
      },
      {
        text: 'All Requests',
        icon: <AssignmentIcon />,
        url: '/progressTracking/allRequests',
        rolesList: [ 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore']
      },
      {
        text: 'My Requests',
        icon: <AssignmentIndIcon />,
        url: '/progressTracking/myRequests',
        rolesList: [ 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha','dumbeldore']
      },
      {
        text: 'My Progress',
        icon: <TimelineIcon />,
        url: '/progressTracking/myProgress',
        rolesList: []
      }
    ]
  }
];

export default items;