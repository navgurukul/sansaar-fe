import React from 'react';
import FormBuilder from '../../../components/FormBuilder';
import formStructure from './formStructure';

const TestUserEdit = () => {

  const onSubmit = async (data) => {
    console.log(data, 'test user edi')
  };
  return (
    <FormBuilder structure={formStructure} onSubmit={onSubmit} />
  );
}

export default TestUserEdit;