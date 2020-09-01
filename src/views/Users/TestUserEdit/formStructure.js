import * as yup from "yup"

const FormData = [
  {
    name: "name",
    type: "text",
    validation: yup
      .string()
      .required("Required")
      .max(15, "Must be 15 characters or less"),
    customProps: {
      id: "name",
      defaultValue: "default Name",
      placeholder: "Enter a name",
      label: "First Name",
      type: "",
    },
  },
  {
    name: "email",
    type: "text",
    validation: yup
      .string()
      .email("Invalid email address")
      .required("Required"),
    customProps: {
      id: "email",
      defaultValue: "default@navgurukul.org",
      placeholder: "kumar19@navgurukul.org",
      label: "Email",
    },
  },
  {
    name: "state",
    type: "select",
    validation: yup
      .string()
      .oneOf(["KA", "BR", "MH", "other"], "please select one")
      .required("Required"),
    options: [
      { name: "KA", value: "Karnataka" },
      { name: "BR", value: "Bellary" },
      { name: "MH", value: "Maharashtra" },
      { name: "other", value: null },
    ],
    customProps: {
      variant: "outlined",
      id: "",
      label: "select a State",
      defaultValue: "KA",
    },
  },
  {
    name: "dob",
    type: "date",
    validation: yup.date().typeError("required"),
    customProps: {
      label: "pick a Date",
      variant: "dialog",
      inputVariant: "outlined",
    },
  },
  {
    name: "gender",
    options: [
      { value: "2", label: "male" },
      { label: "female", value: "1" },
    ],
    customProps: { defaultValue: "1" },
    validation: yup.string().required("required"),
    type: "radio",
    labelText: "Gender",
  },
  {
    name: "Hobbies",
    options: [
      { id: "cricet" },
      { id: "volleyball" },
      { id: "chess" },
      { id: "coding" },
    ],
    preselectedOptions: [{ id: "cricet" }, { id: "volleyball" }],
    validation: yup
      .array()
      .min(1, "please select two options")
      .required("required"),
    type: "checkbox",
    labelText: "Checkboxes",
  },
  {
    name: "Age",
    type: "slider",
    defaultValue: 18,
    validation: yup.number().required("required"),
    customProps: {
      "aria-labelledby": "discrete-slider",
      valueLabelDisplay: "auto",
      step: 1,
      min: 17,
      max: 24,
    },
  },
  {
    name: "Are you ok to join",
    type: "switch",
    validation: yup.boolean().required(),
    labelText: "Mui Switch",
    customProps:{
      defaultValue: true,
    }
  },
]

export default FormData
