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

export const getTrackingFormQuestionAddFormStructure = (question, allQuestions) => {
  const optionsList = []
  let options = allQuestions
    ? allQuestions.forEach(eachQuestion =>
        optionsList.push({ value: eachQuestion.name, name: eachQuestion.id })
      )
    : []

  const optionsCanSelect = optionsList
    ? optionsList.map(option => option.name)
    : []
  options = [...optionsList]

  return [
    {
      name: "questionIds",
      type: "select",
      validation: yup
        .number()
        .typeError("Select something")
        .oneOf(optionsCanSelect, "Please select one")
        .required("Required"),
        
      options,
      customProps: { id: "", label: "Select a Question", defaultValue: "" },
    },
  ]
}

export const getTrackingFormQuestionEditFormStructure = (question, allQuestions) => {
  const fields = getTrackingFormQuestionAddFormStructure(question, allQuestions)
  fields.push(createdAtField)
  return fields
}
