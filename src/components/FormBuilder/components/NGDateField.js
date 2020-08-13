import React from 'react';
import { Controller } from "react-hook-form"
import { Grid, FormControl, withStyles } from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns"
import "date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const styles = (theme) => ({
  date: {
    minWidth: 222,
    textAlign: "left",
  },
});

const DateField = ({ field, errors, classes, control }) => (
  <section key={field.name}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <FormControl error={Boolean(errors[field.name])}>
          <Controller
            as={
              <KeyboardDatePicker
                className={classes.date}
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
      </Grid>
    </MuiPickersUtilsProvider>
  </section>
);

export default  withStyles(styles, { withTheme: true })(DateField);