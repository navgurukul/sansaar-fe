import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { withTheme } from '@material-ui/core';

import { selectors as layoutSelectors, setRightPaneLoading } from '../../../layouts/TwoColumn/store';
import { ngFetch } from '../../../providers/NGFetch';
import { getPathwayEditFormStructure } from '../forms';
import FormBuilder from '../../../components/FormBuilder';
import Spacer from '../../../components/Spacer';
import RightPaneWithTitle from '../../../components/RightPaneWithTitle';
import Milestones from './Milestones';

const PathwayEdit = ({ rightPaneLoading, actions, match, theme, classes }) => {

  const { pathwayId } = match.params;
  const { enqueueSnackbar } = useSnackbar();
  
  const [pathway, setPathway] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      actions.setRightPaneLoading(true);
      const response = await ngFetch(`/pathways/${pathwayId}`);
      setPathway(response.pathway);
      actions.setRightPaneLoading(false);
    }
    fetchData();
  }, [pathwayId]);

  const onSubmit = async (data) => {
    const response = await ngFetch(`/pathways/${pathwayId}`, {
      method: 'PUT',
      body: data,
    });
    setPathway(response.pathway);
    enqueueSnackbar("Pathway details saved.", { variant: 'success' });
  }

  if (!pathway || rightPaneLoading) {
    return <React.Fragment />
  }

  return (
    <RightPaneWithTitle title="Edit Pathway" closeLink="/pathways">
      <FormBuilder structure={getPathwayEditFormStructure(pathway)} onSubmit={onSubmit} initialValues={pathway} />
      <Spacer height={theme.spacing(2)} />
      <Milestones pathway={pathway} />
    </RightPaneWithTitle>
  );
}

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setRightPaneLoading }, dispatch),
});

export default compose(
  withTheme,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PathwayEdit);