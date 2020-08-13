import React from 'react';
import { TextField } from '@material-ui/core';

const NGTextField  = ({ register, errors, field }) => (
  <section key={field.name}>
    <TextField
      {...field.customProps}
      error={!!errors[field.name]}
      name={field.name}
      id={field.name}
      inputRef={register}
      helperText={errors[field.name] ? errors[field.name].message : ' '}
    />
  </section>
);

export default NGTextField;