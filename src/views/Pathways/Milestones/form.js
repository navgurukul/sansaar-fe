import * as yup from "yup";

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

export const getMilestoneAddFormStructure = (milestone,allMilestones) => {
  
  const optionsList=[]
  let optionsToChoose= allMilestones ? allMilestones.map(eachmilestone => optionsList.push({value: eachmilestone.name, name: eachmilestone.position})) : []
  const optionsCanSelect= optionsList ? optionsList.map(option => option.name) : [];
  const lastPosition = Math.max(...optionsCanSelect);
  optionsToChoose =[...optionsList,{value: 'Last', name: lastPosition}]
  
  return([
  {
    name: "name",
    type: "text",
    validation: yup.string().required("Required"),
    customProps: {
      placeholder: "Milestone Name",
      label: "Milestone Name",
    },
  },
  {
    name: "description",
    type: "text",
    validation: yup.string().required("Required"),
    customProps: {
      placeholder: "Milestone Description",
      label: "Milestone Description",
      multiline: true,
      rows: 3
    },
  },
  {
    name: "position",
    type: "select",
    'validation': 
    optionsToChoose.length === 1 ? '' : yup
      .number()
      .typeError('select one')
      .oneOf(
        optionsCanSelect,
        "Please select one"
      )
      .required("Required"),
    options: optionsToChoose,
    customProps: {  id: "", label: "Next milestone", defaultValue: '', disabled: optionsToChoose.length ===1 || milestone.position === 0 },
  },
  
])}

export const getMilestoneEditFormStructure = (milestone,allMilestones) => {
  const fields = getMilestoneAddFormStructure(milestone,allMilestones);
  fields.push(createdAtField);
  return fields;
};
