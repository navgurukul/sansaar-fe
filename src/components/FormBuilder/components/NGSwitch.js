import React from "react"
import { Controller } from "react-hook-form"
import { Switch, FormLabel, FormControl } from "@material-ui/core"


const NGSlider = ({ control, field, errors }) => {
  return (
    <FormControl error={Boolean(errors[field.name])} style={{ width: 200 }}>
      <FormLabel component="legend">{field.name}</FormLabel>
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.customProps.defaultValue}
        render={(props) => (
          <Switch
            onChange={(e) => props.onChange(e.target.checked)}
            checked={props.value}
          />
            )}
      />
    </FormControl>
  )
}

export default NGSlider
