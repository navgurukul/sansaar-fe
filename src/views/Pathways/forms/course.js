import * as yup from "yup";
import { ngFetch } from '../../../providers/NGFetch';


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

export const getCourseAddFormStructure = (course) => {
    
    return([
  {
    name: "name",
    type: "text",
    validation: yup.string().required("Required"),
    customProps: {
      placeholder: "Pathway Name",
      label: "Pathway Name",
    },
  },
  
])
}

export const getCourseEditFormStructure = (course) => {
  const fields = getCourseAddFormStructure(course);
  fields.push(createdAtField);
  return fields;
};