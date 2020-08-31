import React from 'react';
import { useSnackbar } from 'notistack';
import { compose } from "recompose";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addOrEditPathway } from '../../store';
import RightPaneWithTitle from '../../../../components/RightPaneWithTitle';
import FormBuilder from '../../../../components/FormBuilder';
import history from '../../../../providers/routing/app-history';
import { getPathwayAddFormStructure } from '../form/pathway';
import { ngFetch } from '../../../../providers/NGFetch';

const PathwayAdd = ({actions}) => {

  const { enqueueSnackbar } = useSnackbar();

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);

  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    const response = await ngFetch('/pathways', {method: 'POST', body: data});
    const pathwayId= response.pathway.id
    actions.addOrEditPathway({pathway: response.pathway, pathwayId:response.pathway.id});
    enqueueSnackbar('Pathway created.', { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push(`/pathways/${pathwayId}`);
  };

  return (
    <RightPaneWithTitle title="Add Pathway" closeLink="/pathways">
      <FormBuilder structure={getPathwayAddFormStructure()} onSubmit={onSubmit} submitBtnDisabled={submitBtnDisabled} />
    </RightPaneWithTitle>
  );
};


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ addOrEditPathway }, dispatch),
});

export default compose(
  connect(null, mapDispatchToProps)
)(PathwayAdd);