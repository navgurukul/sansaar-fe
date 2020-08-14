import React from 'react';
import { Controller } from "react-hook-form"
import { Grid, FormControl, withStyles } from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns"
import "date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker
} from "@material-ui/pickers";

const styles = (theme) => ({
  date: {
    textAlign: "left",
  },
});

const DateField = ({ field, errors, classes, control }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormControl error={Boolean(errors[field.name])} fullWidth={true}>
        <Controller
          as={
            <KeyboardDatePicker
              inputVariant="outlined"
              {...field.customProps}
              key={field.name}
            />
          }
          name={field.name}
          control={control}
          format="MM/dd/yyyy"
          defaultValue={new Date()}
        />
      </FormControl>
  </MuiPickersUtilsProvider>
);

export default  withStyles(styles, { withTheme: true })(DateField);