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

export const getCourseAddFormStructure = (course, allCourses) => {
  const optionsList = []
  let options = allCourses
    ? allCourses.forEach(eachCourse =>
        optionsList.push({ value: eachCourse.name, name: eachCourse.id })
      )
    : []

  const optionsCanSelect = optionsList
    ? optionsList.map(option => option.name)
    : []
  options = [...optionsList]

  return [
    {
      name: "course_id",
      type: "select",
      validation: yup
        .string()
        .typeError("Select something")
        .required("Required")
        .oneOf(optionsCanSelect, "Please select one"),
      options,
      customProps: { id: "", label: "Select a course", defaultValue: "" },
    },
  ]
}

export const getCourseEditFormStructure = (course, allCourses) => {
  const fields = getCourseAddFormStructure(course, allCourses)
  fields.push(createdAtField)
  return fields
}
