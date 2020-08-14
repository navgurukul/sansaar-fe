import React from 'react';
import { useSnackbar } from 'notistack';

import RightPaneWithTitle from '../../components/RightPaneWithTitle';
import FormBuilder from '../../components/FormBuilder';
import history from '../../providers/routing/app-history';
import { getPathwayAddFormStructure } from './forms';
import { ngFetch } from '../../providers/NGFetch';

const PathwayAdd = () => {

  const { enqueueSnackbar } = useSnackbar();

  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(false);

  const onSubmit = async (data) => {
    setSubmitBtnDisabled(true);
    await ngFetch('/pathways', {method: 'POST', body: data});
    enqueueSnackbar('Pathway created.', { variant: 'success' });
    setSubmitBtnDisabled(false);
    history.push('/pathways');
  };

  return (
    <RightPaneWithTitle title="Add Pathway" closeLink="/pathways">
      <FormBuilder structure={getPathwayAddFormStructure()} onSubmit={onSubmit} submitBtnDisabled={submitBtnDisabled} />
    </RightPaneWithTitle>
  );
};

export default PathwayAdd;