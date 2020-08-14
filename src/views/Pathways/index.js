import React from 'react';

import TwoColumnLayout from '../../layouts/TwoColumn';
import PathwaysList from './List';
import PathwayEdit from './Edit';
import PathwayAdd from './Add';
import MilestonesList from './MilestonesList';

const PathwaysSection = () => {
  const mainPaneRoutes = [
    {
      path: '/pathways/:pathwayId/milestones',
      exact: false,
      component: MilestonesList,
      key: 'MILESTONES_LIST',
    },
    {
      path: '/pathways',
      exact: false,
      component: PathwaysList,
      key: 'PATHWAYS_LIST'
    },
  ];
  const rightPaneRoutes = [
    {
      path: '/pathways/add',
      exact: true,
      component: PathwayAdd,
      key: 'PATHWAY_ADD'
    },
    {
      path: '/pathways/:pathwayId',
      exact: true,
      component: PathwayEdit,
      key: 'PATHWAY_EDIT'
    },
  ];

  return <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
};

export default PathwaysSection;