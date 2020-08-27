import React from 'react';
import TwoColumnLayout from '../../../layouts/TwoColumn';
import CoursesList from './CoursesList';
import CourseAdd from '../Add/Course';

const CoursesSection = () => {
  const mainPaneRoutes = [
    {
      path: '/courses/pathways/:pathwayId',
      exact: false,
      component: CoursesList,
      key: 'Courses_LIST',
    },

  ];
  const rightPaneRoutes = [
    {
      path: '/course/pathways/:pathwayId/add',
      exact: true,
      component: CourseAdd,
      key: 'COURSE_ADD'
    },
  ];

  return <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
};

export default CoursesSection;