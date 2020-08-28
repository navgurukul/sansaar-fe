import React from 'react';
import TwoColumnLayout from '../../layouts/TwoColumn';
import PathwaysList from './PathwaysList';
import PathwayEdit from './Edit/Pathway';
import PathwayAdd from './Add/Pathway';
import MilestonesList from './MilestonesList';
import MilestoneEdit from './Edit/Milestone';
import MilestoneAdd from './Add/Milestone';
import CoursesList from './CoursesList';
import MentorShipTree from './MentoShipTree/MentorShipTree'
import CourseAdd from './Add/Course';
import CourseEdit from './Edit/Course';

const PathwaysSection = () => {
  const mainPaneRoutes = [
    {
      path: '/pathways/:pathwayId/courses',
      exact: false,
      component: CoursesList,
      key: 'COURSES_LIST'
    },
    {
      path: '/pathways/:pathwayId/milestones',
      exact: false,
      component: MilestonesList,
      key: 'MILESTONES_LIST',
    },
    {
      path: '/pathways/:pathwayId/mentorTree',
      auth: true,
      key: 'MENTORSHIP_TREE_SECTION',
      component: MentorShipTree,
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
    },
    {
      path: '/pathways/:pathwayId/courses/add',
      exact: true,
      component: CourseAdd,
      key: 'COURSE_ADD'
    },
    {
      path: '/pathways/:pathwayId/courses/:PathwayCourseId/edit',
      exact: true,
      component: CourseEdit,
      key: 'COURSE_EDIT'
    },
  ];

  return <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
};

export default PathwaysSection;