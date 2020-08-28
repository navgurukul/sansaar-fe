import React, {useEffect} from 'react';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from 'recompose';
import { addOrEditCourse } from '../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../layouts/TwoColumn/store';
import RightPaneWithTitle from '../../../components/RightPaneWithTitle';
import FormBuilder from '../../../components/FormBuilder';
import history from '../../../providers/routing/app-history';
import { getCourseAddFormStructure } from '../forms/course';
import { ngFetch } from '../../../providers/NGFetch';


const CourseAdd = ({ actions, match }) => {
  const {pathwayId} = match.params;
  const { enqueueSnackbar } = useSnackbar();

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);

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

  const onSubmit = async (data) => {
    console.log(data, 'data when you are going to submit')
    data.course_id = data.course_id[0]
    data.sequence_num = data.course_id[1]
    console.log(data, 'datnow')
    setSubmitBtnDisabled(true);
    const response = await ngFetch(`/courses/pathway/${pathwayId}`, {method: 'PUT', body: data});
    console.log(response, 'response after adding')
    // actions.addOrEditCourse({milestone: response.pathway[0], milestoneId:response.pathway[0].id});
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