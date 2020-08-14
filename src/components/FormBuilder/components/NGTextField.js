import React from 'react';
import { TextField } from '@material-ui/core';

const NGTextField  = ({ register, errors, field, fullWidth }) => (
  <TextField
    fullWidth={fullWidth}
    error={!!errors[field.name]}
    name={field.name}
    id={field.name}
    inputRef={register}
    helperText={errors[field.name] ? errors[field.name].message : ' '}
    variant="outlined"
    {...field.customProps}
  />
);

export default NGTextField;