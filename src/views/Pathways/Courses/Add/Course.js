import React, {useEffect} from 'react';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from 'recompose';
import { pullAllBy } from 'lodash';
import { addOrEditCourse } from '../../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../../layouts/TwoColumn/store';
import RightPaneWithTitle from '../../../../components/RightPaneWithTitle';
import FormBuilder from '../../../../components/FormBuilder';
import history from '../../../../providers/routing/app-history';
import { getCourseAddFormStructure } from '../form/course';
import { ngFetch } from '../../../../providers/NGFetch';


const CourseAdd = ({ actions, match }) => {
  const {pathwayId} = match.params;
  const { enqueueSnackbar } = useSnackbar();

  const [coursesAlreadyPresent, setCoursesAlreadyPresent] = React.useState(null);

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);
  const [allCourses, setAllCourses] = React.useState(null);
  useEffect(() => {
    const fetchallCourses = async () => {
      actions.setRightPaneLoading(true);
      const responseOfCourses = await ngFetch(`/courses`);
      setAllCourses(responseOfCourses.availableCourses);
      const responseOfPathwayCourses = await ngFetch(`/pathways/${pathwayId}/courses`);
      setCoursesAlreadyPresent(responseOfPathwayCourses);
      actions.setRightPaneLoading(false);
    }
    fetchallCourses();
  }, [actions,pathwayId]);


  pullAllBy(allCourses, coursesAlreadyPresent, 'name')

  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    const response =await ngFetch(`/pathways/${pathwayId}/courses`, {method: 'POST', body: data});
    actions.addOrEditCourse({pathwaysCourse: response.pathwayCourse, pathwaysCourseId:response.pathwayCourse.id});
    enqueueSnackbar('Course created.', { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push(`/pathways/${pathwayId}/courses`);
  };

  const course= ''
  return (
    <RightPaneWithTitle title="Add Course" closeLink={`/pathways/${pathwayId}/courses`}>
      <FormBuilder structure={getCourseAddFormStructure(course,allCourses)} onSubmit={onSubmit} submitBtnDisabled={submitBtnDisabled} />
    </RightPaneWithTitle>
  );
};

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ addOrEditCourse,setRightPaneLoading }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(CourseAdd);