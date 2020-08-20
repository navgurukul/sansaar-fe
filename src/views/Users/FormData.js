import * as yup from "yup"

const data = [
  {
    name: "firstName",
    type: "text",
    validation: yup
      .string()
      .required("Required")
      .max(15, "Must be 15 characters or less"),
    customProps: {
      variant: "outlined",
      id: "",
      defaultValue: "",
      placeholder: "kumar",
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
      defaultValue: "",
      placeholder: "kumar19@navgurukul.org",
      label: "Email",
    },
  },
  {
    name: "state",
    type: "select",
    validation: yup
      .string()
      .oneOf(
        ["Haryana", "Chandigarh", "Himachal Pradesh", "other"],
        "please select one"
      )
      .required("Required"),
    options: ["Haryana", "Chandigarh", "Himachal Pradesh", "other"],
    customProps: { variant: "outlined", id: "", label: "select a State" },
  },
  {
    name: "date",
    type: "date",
    validation: yup.date().typeError("required"),
    customProps: {
      label: "pick a Date",
      variant: "dialog",
      inputVariant: "outlined",
    },
  },
  {
    name: "Gender",
    customProps: [
      { value: "zero", label: "male" },
      { label: "female", value: "one" },
    ],
    validation: yup.string().required("required"),
    type: "radio",
    labelText: "Gender",
  },
  // {
  //   name: "Hobbies",
  //   HObbies: [
  //     { id: "cricet" },
  //     { id: "volleyball" },
  //     { id: "chess" },
  //     { id: "coding" },
  //   ],
  //   preselectedHObbies: [],
  //   validation: yup
  //     .array()
  //     .transform(function(o, obj) {
  //       return o.filter(o => o)
  //     })
  //     .min(2, "please select two options")
  //     .required("required"),
  //   type: "checkbox",
  //   labelText: "Hobbies",
  // },
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
    name: "switch",
    type: "switch",
    validation: yup.boolean().required(),
    labelText: "Mui Switch",
  },
]

export default data
