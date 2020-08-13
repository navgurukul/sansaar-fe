import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";

import Spacer from '../../components/Spacer';
import NGCheckbox from './components/NGCheckbox';
import NGDateField from './components/NGDateField';
import NGRadioButtons from './components/NGRadioButtons';
import NGSelectField from './components/NGSelectField';
import NGTextField from './components/NGTextField'
import { withStyles, withTheme } from "@material-ui/core";

const COMPONENTS = {
  text: NGTextField,
  select: NGSelectField,
  date: NGDateField,
  radio: NGRadioButtons,
  checkbox: NGCheckbox,
};

const  FormBuilder = ({ structure, initialValues, onSubmit, theme }) => {

  const validationSchema = React.useMemo(() => {
    const schema = yup.object().shape({});
    structure.map(field => {
      schema.fields[ field.name ] = field.validation;
      schema._nodes.push(field.name);
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
    <form>
      {structure.map((field, i) => {
        const FieldComponent = COMPONENTS[field.type];
        return (
          <React.Fragment>
            <FieldComponent
              field={field}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
              control={control}
              register={register}
              key={i}
            />
            <Spacer height={theme.spacing(2)} />
          </React.Fragment>
        )
      })}
    </form>
  );
}

export default withTheme(FormBuilder);
