import React from 'react';
import { Controller } from "react-hook-form";
import { Radio, FormControl, FormLabel, FormControlLabel, RadioGroup, FormHelperText } from '@material-ui/core';

const RadioButtons = ({ field, errors, control }) => (
  <FormControl
    component="fieldset"
    error={Boolean(errors[field.name])}
    key={field.name}
  >
    <FormLabel component="legend">{field.labelText}</FormLabel>
    <Controller
      as={
        <RadioGroup aria-label="gender" {...field.customProps}>
          {field.options.map(each => (
            <FormControlLabel
              {...each}
              control={<Radio />}
              labelPlacement="end"
              key={each.value}
            />
          ))}
        </RadioGroup>
      }
      name={field.name}
      control={control}
      defaultValue={field.customProps.defaultValue}
    />
    <FormHelperText>
      {errors[field.name] && errors[field.name].message}
    </FormHelperText>
  </FormControl>
);

export default RadioButtons;