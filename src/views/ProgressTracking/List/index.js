import React from 'react';
import TwoColumnLayout from '../../../layouts/TwoColumn';
import ParametersList from './Paramters';
import ParameterAdd from "../Add/Parameters/index";
import ParameterEdit from '../Edit/Parameters';

const ParamtersSection = () => {

  const mainPaneRoutes = [
    {
      path: '/progressTracking/parameters',
      exact: false,
      component: ParametersList,
      key: 'PARAMETERS_LIST',
    },
  ];

  const rightPaneRoutes = [
    {
      path: '/progressTracking/parameters/add',
      exact: true,
      component: ParameterAdd,
      key: 'PRAMETERS_ADD',
    },
    {
      path: '/progressTracking/parameters/:parameterId',
      exact: true,
      component: ParameterEdit,
      key: 'USERS_TEST_EDIT'
    }
  ];

  return (
    <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
  );
};


export default ParamtersSection;