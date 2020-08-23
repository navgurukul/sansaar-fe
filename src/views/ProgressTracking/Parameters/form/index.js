import * as yup from "yup"
// import { ngFetch } from '../../../providers/NGFetch';

const createdAtField = {
  name: "createdAt",
  type: "date",
  validation: yup.date().typeError("required"),
  customProps: {
    label: "Created at",
    variant: "dialog",
    disabled: true,
  },
}

export const getParameterAddFormStructure = (parameter,type) => {
  return [
    {
      name: "name",
      type: "text",
      validation: yup
        .string()
        .required("Required")
        .max(15, "must be less than 10"),
      customProps: {
        placeholder: "Parameter Name",
        label: "Parameter Name",
      },
    },
    {
      name: "type",
      type: "select",
      validation: yup
        .string()
        .oneOf(["boolean", "range"], "please select one")
        .required("Required"),
      options: [
        { name: "boolean", value: "Boolean" },
        { name: "range", value: "Range" },
      ],
      customProps: {
        variant: "outlined",
        id: "",
        label: "select a type",
        defaultValue: "",
      },
    },
    {
      name: "min_range",
      type: "text",
      validation: yup
        .number()
        .typeError('you must specify a number')
        .required("Required")
        .min(0, "more than 0"),
        
      customProps: {
        placeholder: "minimum value for range",
        label: "minimum value for range",
        defaultValue: 0,
        disabled: type === 'boolean'
      },
    },
    {
      name: "max_range",
      type: "text",
      validation: yup
        .number()
        .typeError('you must specify a number')
        .required("Required")
        .max(10, "less than 10"),
      customProps: {
        placeholder: "maximum value for range",
        label: "maximum value for range",
        defaultValue: 0,
        disabled: type === 'boolean'
      },
    },
    {
      name: "description",
      type: "text",
      validation: yup.string().required("Required"),
      customProps: {
        placeholder: "Parameter Description",
        label: "Parameter Description",
        multiline: true,
        rows: 3,
      },
    },
  ]
}

export const getParameterEditFormStructure = (parameter, type) => {
  const fields = getParameterAddFormStructure(parameter, type)
  fields.push(createdAtField)
  return fields
}
