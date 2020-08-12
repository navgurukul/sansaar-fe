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
    name: "body",
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
      label: "Content",
      type: "",
    },
  },
]

export default FormData;
