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

export const getClassAddFormStructure = () => {
  return [
    {
      name: "title",
      type: "text",
      validation: yup.string().required("Required"),
      customProps: {
        placeholder: "Class Name",
        label: "Class Name",
      },
    },
    {
      name: "description",
      type: "text",
      validation: yup.string().required("Required"),
      customProps: {
        placeholder: "Class Description",
        label: "Class Description",
        multiline: true,
        rows: 3,
      },
    },
    {
      name: "start_time",
      type: "date",
      validation: yup.date().typeError("required"),
      customProps: {
        label: "Start Time",
        variant: "dialog",
      },
    },
    {
      name: "end_time",
      type: "date",
      validation: yup.date().typeError("required"),
      customProps: {
        label: "End time",
        variant: "dialog",
      },
    },
    {
        name: "exercise_id",
        type: "text",
        validation: yup.number().required("Required").typeError("Must be a number"),
        customProps: {
          placeholder: "exercise id",
          label: "Exercise Id",
        },
      },
      {
        name: "course_id",
        type: "text",
        validation: yup.number().required("Required").typeError("Must be a number"),
        customProps: {
          placeholder: "Course id",
          label: "Course Id",
        },
      },
      {
        name: "category_id",
        type: "text",
        validation: yup.number().required("Required").typeError("Must be a number"),
        customProps: {
          placeholder: "Category id",
          label: "Category Id",
        },
      },
      {
        name: "video_id",
        type: "text",
        validation: yup.string().required("Required"),
        customProps: {
          placeholder: "Video id",
          label: "Video Id",
        },
      },
    {
      name: "lang",
      type: "select",
      validation:  yup
          .string()
          .required("Required")
          .oneOf(["hi","en","te"], "Please select one"),
    
      options: [{name:"hi", value:"Hindi"},{name:"en", value:"English"},{name:"te", value:"Telugu"}],
      customProps: {
        id: "",
        label: "select a language",
        defaultValue: "",
      },
    },
    {
      name: "type",
      type: "select",
      validation:  yup
      .string()
      .required("Required")
      .oneOf(["workshop","doubt_class"], "Please select one"),
      options: [{name:"workshop", value:"Workshop"},{name:"doubt_class", value:"Doubt class"}],
      customProps: {
        id: "",
        label: "select type of class",
        defaultValue: "",
      },
    },
    
  ]
}

export const getClassEditFormStructure = (classopened) => {
  const fields = getClassAddFormStructure(classopened)
  fields.push(createdAtField)
  return fields
}
