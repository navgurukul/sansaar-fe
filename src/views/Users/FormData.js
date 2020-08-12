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
      variant: "outlined",
      id: "",
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
      variant: "outlined",
      id: "",
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
    HObbies: [
      { id: "cricet" },
      { id: "volleyball" },
      { id: "chess" },
      { id: "coding" },
    ],
    preselectedHObbies: [{ id: "cricet" }, { id: "volleyball" }],
    validation: yup
      .array()
      .transform(function(o, obj) {
        return o.filter(o => o)
      })
      .min(2, "please select two options")
      .required("required"),
    type: "checkbox",
    labelText: "Hobbies",
  },
  {
    name: "Age",
    type: "slider",
    validation: yup.number().required("required"),
    customProps: {
      "aria-labelledby": "discrete-slider",
      valueLabelDisplay: "auto",
      step: 1,
      min: 17,
      defaultValue: 18,
      max: 24,
    },
  },
  {
    name: "switch",
    type: "switch",
    validation: yup.boolean().required(),
    labelText: "Mui Switch",
  },
]

export default FormData
