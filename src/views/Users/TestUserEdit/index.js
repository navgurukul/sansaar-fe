import React from 'react';
import FormBuilder from '../../../components/FormBuilder';
import formStructure from './formStructure';
import { Box } from '@material-ui/core';

const TestUserEdit = () => {
  return (
    <FormBuilder structure={formStructure} />
  );
}

export default TestUserEdit;