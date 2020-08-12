import React from 'react';

import RoutesFromList from '../../providers/routing/RoutesFromList';
import RightPaneWrapper from './RightPaneWrapper';
import MainPane from './MainPane';

const TwoColumnLayout = ({
  mainPaneRoutes,
  rightPaneRoutes,
}) => {

  return (
    <React.Fragment>
      <MainPane routes={mainPaneRoutes} />
      <RoutesFromList routes={rightPaneRoutes} WrapComponent={RightPaneWrapper} />
    </React.Fragment>
  );
};


export default TwoColumnLayout;