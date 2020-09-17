import React from 'react';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from 'recompose';
import { addOrEditQuestion } from '../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../layouts/TwoColumn/store';
import RightPaneWithTitle from '../../../components/RightPaneWithTitle';
import FormBuilder from '../../../components/FormBuilder';
import history from '../../../providers/routing/app-history';
import { getQuestionAddFormStructure } from './form';
import { ngFetch } from '../../../providers/NGFetch';


const QuestionAdd = ({ actions }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [type, setType] = React.useState(null)
  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);

  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    const response = await ngFetch(`/progressTracking/questions`, {method: 'POST', body: data});
    actions.addOrEditQuestion({question: response.question, parameterId:response.question.id });
    enqueueSnackbar('question created.', { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push(`/progressTracking/questions`);
  };

  const selectedType = (v) => {
    setType(v)
  }
  const question =''
  
  return (
    <RightPaneWithTitle title="Add Question" closeLink="/progressTracking/questions">
      <FormBuilder structure={getQuestionAddFormStructure(question,type)} onSubmit={onSubmit} submitBtnDisabled={submitBtnDisabled} selectedType={selectedType} />
    </RightPaneWithTitle>
  );
};

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ addOrEditQuestion,setRightPaneLoading }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(QuestionAdd);