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

export const getCourseAddFormStructure = (course,allCourses) => {

  const optionsList=[]
  let optionsToChoose= allCourses ? allCourses.map(eachcourse => optionsList.push({value: eachcourse.name, name:eachcourse.id })) : []
  const optionsCanSelect= optionsList ? optionsList.map(option => option.name) : [];
  optionsToChoose =[...optionsList]

  return [
    {
      name: "course_id",
      type: "select",
      'validation': yup
      .string().typeError('select something').required('required')
      .oneOf(
        optionsCanSelect,
        "please select one"
      ),
    options: optionsToChoose,
    customProps: { variant: "outlined", id: "", label: "Select a course", defaultValue: '' },
    },

  ]
}

export const getCourseEditFormStructure = (course,allCourses) => {
  const fields = getCourseAddFormStructure(course,allCourses)
  fields.push(createdAtField)
  return fields
}
