import React from 'react';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from 'recompose';
import { addOrEditParameter } from '../../store';
import { selectors as layoutSelectors, setRightPaneLoading } from '../../../../layouts/TwoColumn/store';
import RightPaneWithTitle from '../../../../components/RightPaneWithTitle';
import FormBuilder from '../../../../components/FormBuilder';
import history from '../../../../providers/routing/app-history';
import { getParameterAddFormStructure } from '../../forms/parameters';
import { ngFetch } from '../../../../providers/NGFetch';


const ParamterAdd = ({ actions }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);

  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    const response = await ngFetch(`/progressTracking/parameters`, {method: 'POST', body: data});
    actions.addOrEditParameter({parameter: response.parameter, parameterId:response.parameter.id });
    enqueueSnackbar('Parameter created.', { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push(`/progressTracking/parameters`);
  };

  return (
    <RightPaneWithTitle title="Add Parameter" closeLink="/progressTracking/parameters">
      <FormBuilder structure={getParameterAddFormStructure()} onSubmit={onSubmit} submitBtnDisabled={submitBtnDisabled} />
    </RightPaneWithTitle>
  );
};

const mapStateToProps = (state) => ({
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ addOrEditParameter,setRightPaneLoading }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ParamterAdd);