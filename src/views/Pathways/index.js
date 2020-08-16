import React from 'react';
import TwoColumnLayout from '../../layouts/TwoColumn';
import PathwaysList from './PathwaysList';
import PathwayEdit from './Edit/PathwayEdit';
import PathwayAdd from './Add/PathwayAdd';
import MilestonesList from './MilestonesList';
import MilestoneEdit from './Edit/MilestoneEdit';
import MilestoneAdd from './Add/MilestoneAdd';

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
    {
      path: '/pathways/:pathwayId/milestones/add',
      exact: true,
      component: MilestoneAdd,
      key: 'MILESTONE_ADD'
    },
    {
      path: '/pathways/:pathwayId/milestones/:milestoneId',
      exact: true,
      component: MilestoneEdit,
      key: 'MILESTONE_ADD'
    }
  ];

  return <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
};

export default PathwaysSection;