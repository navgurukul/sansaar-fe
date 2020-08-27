import React from 'react';
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
import { getCourseAddFormStructure } from '../forms/milestone';
import { ngFetch } from '../../../providers/NGFetch';


const CourseAdd = ({ actions, match }) => {
  const {pathwayId} = match.params;
  const { enqueueSnackbar } = useSnackbar();

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);

  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    const response = await ngFetch(`/courses/pathways/${pathwayId}`, {method: 'PUT', body: data});
    console.log(response, 'response after adding')
    // actions.addOrEditMilestone({milestone: response.pathway[0], milestoneId:response.pathway[0].id});
    enqueueSnackbar('Course created.', { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push(`/courses/pathways/${pathwayId}`);
  };

  return (
    <RightPaneWithTitle title="Add Course" closeLink={`/courses/pathways/${pathwayId}`}>
      <FormBuilder structure={getCourseAddFormStructure()} onSubmit={onSubmit} submitBtnDisabled={submitBtnDisabled} />
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