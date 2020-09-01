import React from "react"
import { Controller } from "react-hook-form"
import { Slider, FormLabel, FormControl } from "@material-ui/core"


const NGSlider = ({ control, field, errors,fullWidth }) => {
  return (
    <FormControl error={Boolean(errors[field.name])} fullWidth={fullWidth}>
      <FormLabel component="legend">{field.name}</FormLabel>
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.defaultValue}
        render={props => {
          return (
            <Slider
              {...props}
              onChange={(_, value) => {
                props.onChange(value)
              }}
              {...field.customProps}
            />
          )
        }}
      />
    </FormControl>
  )
}

export default NGSlider
