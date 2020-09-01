import * as yup from "yup"

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

export const getQuestionAddFormStructure = () => {
  return [
    {
      name: "name",
      type: "text",
      validation: yup
        .string()
        .required("Required")
        .max(15, "must be less than 10"),
      customProps: {
        placeholder: "Question Name",
        label: "Question Name",
      },
    },
    {
      name: "type",
      type: "select",
      validation: yup
        .string()
        .oneOf(["text"], "Please select one")
        .required("Required"),
      options: [
        { name: "text", value: "Text" },
      ],
      customProps: {
        id: "",
        label: "select a type",
        defaultValue: "text",
      },
    },
    {
      name: "description",
      type: "text",
      validation: yup.string().required("Required"),
      customProps: {
        placeholder: "Question Description",
        label: "Question Description",
        multiline: true,
        rows: 3,
      },
    },
  ]
}

export const getQuestionEditFormStructure = (question) => {
  const fields = getQuestionAddFormStructure(question)
  fields.push(createdAtField)
  return fields
}
