import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { withTheme, Button } from '@material-ui/core';
import { selectors, setPathwayToView, addOrEditPathway } from '../../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../../layouts/TwoColumn/store';
import { ngFetch } from '../../../../providers/NGFetch';
import { getPathwayEditFormStructure } from '../../forms/pathway';
import FormBuilder from '../../../../components/FormBuilder';
import Spacer from '../../../../components/Spacer';
import RightPaneWithTitle from '../../../../components/RightPaneWithTitle';
import Milestones from './Milestones';
import history from '../../../../providers/routing/app-history';
import Courses from './Courses';

const PathwayEdit = ({ rightPaneLoading, actions, match, theme }) => {

  const { pathwayId } = match.params;
  const { enqueueSnackbar } = useSnackbar();
  
  const [pathway, setPathway] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      actions.setRightPaneLoading(true);
      const response = await ngFetch(`/pathways/${pathwayId}`);
      actions.setPathwayToView(response.pathway);
      setPathway(response.pathway);
      actions.setRightPaneLoading(false);
    }
    fetchData();
  }, [actions,pathwayId]);

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);
  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    delete data.createdAt
    const response = await ngFetch(`/pathways/${pathwayId}`, {
      method: 'PUT',
      body: data,
    });
    actions.addOrEditPathway({pathway: response.pathway, pathwayId:response.id})
    setPathway(response.pathway);
    enqueueSnackbar("Pathway details saved.", { variant: 'success' });
    setSubmitBtnDisabled(false);
  }

  if (!pathway || rightPaneLoading) {
    return <React.Fragment />
  }

  const ViewMentorTree =() =>{
    history.push(`/pathway/${pathwayId}/mentorTree`)
  }

  console.log(pathway, 'pathwaypathway')

  return (
    <RightPaneWithTitle title="Edit Pathway" closeLink="/pathways">
      <FormBuilder structure={getPathwayEditFormStructure(pathway)} onSubmit={onSubmit} initialValues={pathway} submitBtnDisabled={submitBtnDisabled} />
      <Spacer height={theme.spacing(2)} />
      <Button fullWidth variant="contained" disableElevation color="primary" onClick={() => ViewMentorTree()}>View MentorTree</Button>
      <Courses pathway={pathway} />
      <Milestones pathway={pathway} />
    </RightPaneWithTitle>
  );
}

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
  pathway: selectors.selectPathwayToView(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setRightPaneLoading, setPathwayToView , addOrEditPathway }, dispatch),
});

export default compose(
  withTheme,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PathwayEdit);