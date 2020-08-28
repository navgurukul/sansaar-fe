import * as yup from "yup"
import { ngFetch } from "../../../providers/NGFetch"

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
  console.log(allCourses,'allCourses')
  const optionsList=[]
  let optionsToChoose= allCourses ? allCourses.map(eachcourse => optionsList.push({value: eachcourse.name, name: [eachcourse.id,eachcourse.sequence_num], sequence_num:eachcourse.sequence_num, })) : []
  const optionsCanSelect= optionsList ? optionsList.map(option => option.name) : [];
  optionsToChoose =[...optionsList]
  console.log(optionsCanSelect,optionsToChoose,'optionsCanSelect')

  return [
    {
      name: "course_id",
      type: "select",
      'validation': yup
      .array()
      // .oneOf(
      //   optionsCanSelect,
      //   "please select one"
      // )
      .required("Required"),
    options: optionsToChoose,
    customProps: { variant: "outlined", id: "", label: "Select a course", defaultValue: '' },
  
    },
  ]
}

export const getCourseEditFormStructure = (course, allCourses) => {
  const fields = getCourseAddFormStructure(course,allCourses)
  fields.push(createdAtField)
  return fields
}
