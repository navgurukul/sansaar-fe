import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";

import { withTheme, Button } from "@material-ui/core";
import Spacer from "../Spacer";
import NGCheckbox from './components/NGCheckbox';
import NGDateField from './components/NGDateField';
import NGRadioButtons from './components/NGRadioButtons';
import NGSelectField from './components/NGSelectField';
import NGTextField from './components/NGTextField'


const COMPONENTS = {
  text: NGTextField,
  select: NGSelectField,
  date: NGDateField,
  radio: NGRadioButtons,
  checkbox: NGCheckbox,
};

const  FormBuilder = ({
  structure,
  initialValues,
  onSubmit,
  theme,
  fullWidth = true,
  fullWidthSubmitBtn = true,
  submitBtnDisabled
}) => {

  const validationSchema = React.useMemo(() => {
    const schema = yup.object().shape({});
    structure.map(field => {
      if (field.validation) {
        schema.fields[ field.name ] = field.validation;
        schema._nodes.push(field.name);
      }
    });
    return schema;
  }, [structure]);

  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
  } = useForm({
    validationSchema,
    mode: "onBlur",
    submitFocusError: false,
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...initialValues,
      switch: false,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {structure.map((field) => {
        const FieldComponent = COMPONENTS[field.type];
        return (
          <React.Fragment key={field.name}>
            <FieldComponent
              fullWidth={fullWidth}
              field={field}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
              control={control}
              register={register}
            />
            <Spacer height={theme.spacing(1)} />
          </React.Fragment>
        )
      })}
      <Spacer height={theme.spacing(1)} />
      <Button
        fullWidth={fullWidthSubmitBtn}
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitBtnDisabled}
        disableElevation
      >
        Submit
      </Button>
    </form>
  );
}

export default withTheme(FormBuilder);
