/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import { makeStyles } from "@material-ui/core/styles"
import NativeSelect from "@material-ui/core/NativeSelect"
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Button,
  TextField,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Slider,
  Switch,
  Typography,
} from "@material-ui/core"

import * as yup from "yup"
import Grid from "@material-ui/core/Grid"
import DateFnsUtils from "@date-io/date-fns"
import "date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  root: {
    align: "center",
  },
  text: {
    marginTop: "20px",
  },
  select: {
    minWidth: 222,
    textAlign: "left",
  },
  date: {
    minWidth: 222,
    textAlign: "left",
  },
  slider: {
    width: 200,
  },
  button: { marginTop: "10px", marginBottom: "10px" },
}))

export default function FormBuilder({
  FromData,
  onClick,
  id,
  firstName,
  initialValues,
  gender,
}) {
  const classes = useStyles()

  const schema = yup.object().shape({})
  function SchemUpdate(value) {
    schema.fields[value.name] = value.validation
    schema._nodes.push(value.name)
    return null
  }

  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
    watch,
  } = useForm({
    validationSchema: schema,
    mode: "onBlur",
    submitFocusError: false,
    resolver: yupResolver(schema),
    defaultValues: {
      ...initialValues,
      switch: false,
    },
  })

  // console.log(initialValues, "GenderData")
  const onSubmit = data => console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        {FromData.map(e =>
          e.type === "text" ? (
            <section key={e.name} className={classes.text}>
              {SchemUpdate(e)}
              <TextField
                {...e.customProps}
                error={!!errors[e.name]}
                name={e.name}
                id={e.name}
                inputRef={register}
                helperText={errors[e.name] && errors[e.name].message}
              />
            </section>
          ) : e.type === "select" ? (
            <section key={e.name} className={classes.text}>
              {SchemUpdate(e)}
              <FormControl
                error={Boolean(errors[e.name])}
                variant={
                  e.customProps.variant ? e.customProps.variant : "standard"
                }
              >
                <InputLabel>
                  {e.customProps.label ? e.customProps.label : ""}
                </InputLabel>
                <Controller
                  as={
                    <Select {...e.customProps}>
                      {e.options.map((option, index) => (
                        <MenuItem value={option.name} key={index}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  name={e.name}
                  control={control}
                  defaultValue={e.customProps.defaultValue}
                />
                <FormHelperText>
                  {errors[e.name] && errors[e.name].message}
                </FormHelperText>
              </FormControl>
            </section>
          ) : e.type === "date" ? (
            <section key={e.name}>
              {SchemUpdate(e)}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around" className={classes.root}>
                  <FormControl error={Boolean(errors[e.name])}>
                    <Controller
                      as={
                        <KeyboardDatePicker
                          className={classes.date}
                          {...e.customProps}
                          key={e.name}
                        />
                      }
                      name={e.name}
                      control={control}
                      format="MM/dd/yyyy"
                      defaultValue={new Date()}
                    />
                  </FormControl>
                </Grid>
              </MuiPickersUtilsProvider>
            </section>
          ) : e.type === "radio" ? (
            <FormControl
              component="fieldset"
              error={Boolean(errors[e.name])}
              className={classes.root}
              key={e.name}
            >
              <FormLabel component="legend">{e.labelText}</FormLabel>
              {SchemUpdate(e)}
              <Controller
                as={
                  <RadioGroup aria-label="gender" {...e.customProps}>
                    {e.options.map(each => (
                      <FormControlLabel
                        {...each}
                        control={<Radio />}
                        labelPlacement="end"
                        key={each.value}
                      />
                    ))}
                  </RadioGroup>
                }
                name={e.name}
                control={control}
                defaultValue={e.customProps.defaultValue}
              />
              <FormHelperText>
                {errors[e.name] && errors[e.name].message}
              </FormHelperText>
            </FormControl>
          ) : e.type === "checkbox" ? (
            <div key={e.name}>
              {SchemUpdate(e)}
              <FormControl error={Boolean(errors[e.name])}>
                <FormLabel component="legend" className={classes.select}>
                  {e.labelText}
                </FormLabel>
                <FormGroup>
                  {e.HObbies.map((boat, index) => {
                    return (
                      <FormCheckBox
                        name={e.name}
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                        value={boat.id}
                        register={register}
                        key={index}
                        defaultValue={e.preselectedHObbies.some(
                          p => p.id === boat.id
                        )}
                      />
                    )
                  })}
                </FormGroup>
                <FormHelperText>
                  {errors[e.name] && errors[e.name].message}
                </FormHelperText>
              </FormControl>
            </div>
          ) : e.type === "slider" ? (
            <FormControl className={classes.slider} error={Boolean(errors[e.name])} key={e.name}>
              {SchemUpdate(e)}
              <FormLabel>
                <Typography id="discrete-slider" gutterBottom>
                  {e.name}
                </Typography>
              </FormLabel>
              <Controller
                name={e.name}
                control={control}
                onChange={([, value]) => value}
                as={<Slider {...e.customProps} />}
                defaultValue={e.customProps.defaultValue}
              />
            </FormControl>
          ) : e.type === "switch" ? (
            <section key={e.name}>
              {SchemUpdate(e)}
              <FormControl error={Boolean(errors[e.name])}>
                <Controller
                  as={Switch}
                  type="checkbox"
                  name="switch"
                  control={control}
                  defaultValue=""
                />
              </FormControl>
            </section>
          ) : (
            ""
          )
        )}

        <div className={classes.text}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

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
