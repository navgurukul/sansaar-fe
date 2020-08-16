import React from 'react';

import { FormControl, FormLabel, FormGroup, FormHelperText, FormControlLabel, Checkbox } from '@material-ui/core';

const NGCheckbox = ({ field, control, setValue, getValues, register, errors }) => (
  <FormControl error={Boolean(errors[field.name])}>
    <FormLabel component="legend">
      {field.labelText}
    </FormLabel>
    <FormGroup>
      {field.hobbies.map((boat) => (
        <React.Fragment key={boat.id}>
          <FormCheckBox
            name={field.name}
            control={control}
            setValue={setValue}
            getValues={getValues}
            value={boat.id}
            register={register}
            defaultValue={field.preselectedHObbies.some(
              p => p.id === boat.id
            )}
          />
        </React.Fragment>
      ))}
    </FormGroup>
    <FormHelperText>
      {errors[field.name] && errors[field.name].message}
    </FormHelperText>
  </FormControl>
);

export const FormCheckBox = ({ name, value, register, defaultValue }) => {
  return (
    <FormControlLabel
      control={<Checkbox defaultChecked={defaultValue} />}
      name={name}
      inputRef={register}
      value={value}
      label={value}
      labelPlacement="end"
    />
  )
}

export default NGCheckbox;