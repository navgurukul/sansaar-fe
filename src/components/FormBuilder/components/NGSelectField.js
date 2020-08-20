import React from "react"
import { Controller } from "react-hook-form"

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core"

const SelectField = ({ control, field, errors, fullWidth }) => (
  <section key={field.name}>
    <FormControl
      error={Boolean(errors[field.name])}
      variant={
        field.customProps.variant ? field.customProps.variant : "standard"
      }
      fullWidth={fullWidth}
    >
      <InputLabel>
        {field.customProps.label ? field.customProps.label : ""}
      </InputLabel>
      <Controller
        as={
          (
            <Select {...field.customProps}>
              {field.options.map((option) => (
                <MenuItem value={option.name} key={option.value}>
                  {option.value}
                </MenuItem>
            ))}
            </Select>
)
        }
        name={field.name}
        control={control}
        defaultValue={field.customProps.defaultValue}
      />
      <FormHelperText>
        {errors[field.name] && errors[field.name].message}
      </FormHelperText>
    </FormControl>
  </section>
)

export default SelectField
