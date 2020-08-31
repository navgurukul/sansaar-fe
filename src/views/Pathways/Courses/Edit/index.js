import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { withTheme } from '@material-ui/core';
import {find} from 'lodash';
import { selectors, setCourseToView, addOrEditCourse } from '../../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../../layouts/TwoColumn/store';
import { ngFetch } from '../../../../providers/NGFetch';
import { getCourseEditFormStructure } from '../form/course';
import FormBuilder from '../../../../components/FormBuilder';
import Spacer from '../../../../components/Spacer';
import RightPaneWithTitle from '../../../../components/RightPaneWithTitle';
import history from '../../../../providers/routing/app-history';

const PathwayCourseEdit = ({ rightPaneLoading, actions, match, theme }) => {

  const { pathwayCourseId, pathwayId } = match.params;
  const { enqueueSnackbar } = useSnackbar();

  const [coursesAlreadyPresent, setCoursesAlreadyPresent] = React.useState(null);

  const [allCourses, setAllCourses] = React.useState(null);
  const [course, setCourse] = React.useState(null);

  useEffect(() => {
    const fetchallCourses = async () => {
      actions.setRightPaneLoading(true);
      const responseOfCourses = await ngFetch(`/courses`);
      setAllCourses(responseOfCourses.availableCourses);
      const responseOfPathwayCourses = await ngFetch(`/pathways/${pathwayId}/courses`);
      setCoursesAlreadyPresent(responseOfPathwayCourses);
      const responseOfOpenedCourse = await ngFetch(`/pathways/${pathwayId}/courses/${pathwayCourseId}`);
      setCourse(responseOfOpenedCourse.pathwayCourse)
      actions.setRightPaneLoading(false);
    }
    fetchallCourses();
  }, [actions,pathwayId,pathwayCourseId]);


  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);
  const onSubmit = async (data) => {
    {find(coursesAlreadyPresent,{course_id: parseInt(data.course_id, 10) }) && enqueueSnackbar('Course is already there.', { variant: 'failed' }) } 
    delete data.createdAt
    const response = await ngFetch(`/pathways/${pathwayId}/courses/${pathwayCourseId}`, {
      method: 'PUT',
      body: data,
    });
    actions.addOrEditCourse({pathwaysCourse: response.updatedpathwayCourse, pathwaysCourseId:response.updatedpathwayCourse.id});
    setCourse(response.updatedpathwayCourse);
    enqueueSnackbar("Course details saved.", { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push(`/pathways/${pathwayId}/courses/`);
  }

  if (!course || rightPaneLoading) {
    return <React.Fragment />
  }

  return (
    <RightPaneWithTitle title="Edit Course" closeLink={`/pathways/${pathwayId}/courses`}>
      <FormBuilder structure={getCourseEditFormStructure(course,allCourses)} onSubmit={onSubmit} initialValues={course} submitBtnDisabled={submitBtnDisabled} />
      <Spacer height={theme.spacing(2)} />
    </RightPaneWithTitle>
  );
}

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
  milestone: selectors.selectMilestoneToView(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setRightPaneLoading,setCourseToView, addOrEditCourse }, dispatch),
});

export default compose(
  withTheme,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PathwayCourseEdit);