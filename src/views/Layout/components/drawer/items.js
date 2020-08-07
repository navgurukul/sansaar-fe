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
    url: '/',
  },
  {
    text: 'Users',
    icon: <PeopleIcon />,
    url: '/users',
    dividerBelow: true
  },
  {
    text: 'Pathways',
    icon: <DirectionsBikeIcon />,
    url: '/pathways'
  },
  {
    text: 'Progress Tracking',
    icon: <TrendingUpIcon />,
    children: [
      {
        text: 'Parameters',
        icon: <TuneIcon />,
        url: '/progressTracking/parameters'
      },
      {
        text: 'Questions',
        icon: <HelpIcon />,
        url: '/progressTracking/questions'
      },
      {
        text: 'My Mentees',
        icon: <ContactsIcon />,
        url: '/progressTracking/myMentees'
      },
      {
        text: 'All Requests',
        icon: <AssignmentIcon />,
        url: '/progressTracking/allRequests'
      },
      {
        text: 'My Requests',
        icon: <AssignmentIndIcon />,
        url: '/progressTracking/myRequests'
      },
      {
        text: 'My Progress',
        icon: <TimelineIcon />,
        url: '/progressTracking/myProgress'
      }
    ]
  }
];

export default items;