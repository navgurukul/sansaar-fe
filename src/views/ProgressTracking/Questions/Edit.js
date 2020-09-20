import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { withTheme, Container } from '@material-ui/core';
import { selectors, setQuestionToView, addOrEditQuestion } from '../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../layouts/TwoColumn/store';
import { ngFetch } from '../../../providers/NGFetch';
import { getQuestionEditFormStructure } from './form';
import FormBuilder from '../../../components/FormBuilder';
import Spacer from '../../../components/Spacer';
import RightPaneWithTitle from '../../../components/RightPaneWithTitle';
import history from '../../../providers/routing/app-history';

const OuestionEdit = ({ rightPaneLoading, actions, match, theme }) => {

  const { questionId } = match.params;
  const { enqueueSnackbar } = useSnackbar();
  const [type, setType] = React.useState(null)
  const [question, setQuestion] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      actions.setRightPaneLoading(true);
      const response = await ngFetch(`/progressTracking/questions/${questionId}`);
      actions.setQuestionToView(response.question);
      setQuestion(response.question);
      actions.setRightPaneLoading(false);
    }
    fetchData();
  }, [actions,questionId]);

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);
  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    delete data.createdAt
    const response = await ngFetch(`/progressTracking/questions/${questionId}`, {
      method: 'PUT',
      body: data,
    });
    actions.addOrEditQuestion({question: data, questionId})
    setQuestion(response.question);
    enqueueSnackbar("Question details saved.", { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push('/progressTracking/questions/');
  }

  const selectedType = (v) => {
    setType(v)
  }

  if (!question || rightPaneLoading) {
    return <React.Fragment />
  }

  return (
    <Container>
      <RightPaneWithTitle title="Edit Question" closeLink="/progressTracking/questions/">
        <FormBuilder structure={getQuestionEditFormStructure(question,type)} onSubmit={onSubmit} initialValues={question} submitBtnDisabled={submitBtnDisabled} selectedType={selectedType}  />
        <Spacer height={theme.spacing(2)} />
      </RightPaneWithTitle>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
  question: selectors.selectQuestionToView(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setRightPaneLoading, setQuestionToView , addOrEditQuestion }, dispatch),
});

export default compose(
  withTheme,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(OuestionEdit);