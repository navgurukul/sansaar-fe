import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { withTheme } from '@material-ui/core';
import { selectors, setPathwayCourseToView, addOrEditCourse } from '../../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../../layouts/TwoColumn/store';
import { ngFetch } from '../../../../providers/NGFetch';
import { getMilestoneEditFormStructure } from '../../forms/milestone';
import FormBuilder from '../../../../components/FormBuilder';
import Spacer from '../../../../components/Spacer';
import RightPaneWithTitle from '../../../../components/RightPaneWithTitle';
import history from '../../../../providers/routing/app-history';

const PathwayCourseEdit = ({ rightPaneLoading, actions, match, theme }) => {

  const { PathwayCourseId, pathwayId } = match.params;
  const { enqueueSnackbar } = useSnackbar();
 
  const [course, setCourse] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      actions.setRightPaneLoading(true);
      const response = await ngFetch(`/pathways/${pathwayId}/courses/${PathwayCourseId}`);
      actions.setCourseToView(response);
    //   setCourse(response.milestone);
      actions.setRightPaneLoading(false);
    }
    fetchData();
  }, [PathwayCourseId,pathwayId,actions]);

  const [allCourses, setallCourses] = React.useState(null);
  useEffect(() => {
    const fetchallCourses = async () => {
      actions.setRightPaneLoading(true);
      const response = await ngFetch(`/courses`);
      setallCourses(response.availableCourses);
      actions.setRightPaneLoading(false);
    }
    fetchallCourses();
  }, [actions]);

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);
  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    delete data.createdAt
    const response = await ngFetch(`/pathways/${pathwayId}/courses/${PathwayCourseId}`, {
      method: 'PUT',
      body: data,
    });
    // actions.addOrEditMilestone({milestone: response.milestone[0], milestoneId:response.milestone[0].id});
    // setMilestone(response.milestone);
    enqueueSnackbar("Course details saved.", { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push(`/pathways/${pathwayId}/courses/`);
  }

  if (!course || rightPaneLoading) {
    return <React.Fragment />
  }

  return (
    <RightPaneWithTitle title="Edit Milestone" closeLink={`/pathways/${pathwayId}/courses`}>
      <FormBuilder structure={getMilestoneEditFormStructure(course,allCourses)} onSubmit={onSubmit} initialValues={course} submitBtnDisabled={submitBtnDisabled} />
      <Spacer height={theme.spacing(2)} />
    </RightPaneWithTitle>
  );
}

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
  milestone: selectors.selectMilestoneToView(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setRightPaneLoading,setMilestoneToView, addOrEditMilestone }, dispatch),
});

export default compose(
  withTheme,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(MilestoneEdit);