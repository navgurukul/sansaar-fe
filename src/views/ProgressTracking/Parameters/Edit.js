import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { withTheme } from '@material-ui/core';
import { selectors, setParameterToView, addOrEditParameter } from '../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../layouts/TwoColumn/store';
import { ngFetch } from '../../../providers/NGFetch';
import { getParameterEditFormStructure } from './form';
import FormBuilder from '../../../components/FormBuilder';
import Spacer from '../../../components/Spacer';
import RightPaneWithTitle from '../../../components/RightPaneWithTitle';
import history from '../../../providers/routing/app-history';

const ParameterEdit = ({ rightPaneLoading, actions, match, theme }) => {

  const { parameterId } = match.params;
  const { enqueueSnackbar } = useSnackbar();
  
  const [parameter, setParameter] = React.useState(null);
  const [type, setType] = React.useState(null)

  useEffect(() => {
    const fetchData = async () => {
      actions.setRightPaneLoading(true);
      const response = await ngFetch(`/progressTracking/parameters/${parameterId}`);
      actions.setParameterToView(response.parameter);
      setParameter(response.parameter);
      actions.setRightPaneLoading(false);
    }
    fetchData();
  }, [actions,parameterId]);

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);
  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    delete data.createdAt
    const response = await ngFetch(`/progressTracking/parameters/${parameterId}`, {
      method: 'PUT',
      body: data,
    });
    actions.addOrEditParameter({parameter: data, parameterId})
    setParameter(response.parameter);
    enqueueSnackbar("Parameter details saved.", { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push('/progressTracking/parameters/');
  }

  if (!parameter || rightPaneLoading) {
    return <React.Fragment />
  }

  const selectedType = (v) => {
    setType(v)
  }
  const fieldsToWatch ={
    type:selectedType,
  }
  return (
    <RightPaneWithTitle title="Edit Parameter" closeLink="/progressTracking/parameters/">
      <FormBuilder structure={getParameterEditFormStructure(parameter,type)} onSubmit={onSubmit} initialValues={parameter} submitBtnDisabled={submitBtnDisabled} fieldsToWatch={fieldsToWatch} />
      <Spacer height={theme.spacing(2)} />
    </RightPaneWithTitle>
  );
}

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
  parameter: selectors.selectParameterToView(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setRightPaneLoading, setParameterToView , addOrEditParameter }, dispatch),
});

export default compose(
  withTheme,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ParameterEdit);