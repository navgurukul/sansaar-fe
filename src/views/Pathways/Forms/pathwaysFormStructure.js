import * as yup from "yup";

import { ngFetch } from '../../../providers/NGFetch';

yup.addMethod(yup.string, 'pathwayCodeIsUnique', function CODE({ currentCode }) {
  return this.test({
    name: 'pathwayCodeUnique',
    message: 'Code is taken by another pathway.',
    test: async (code = "") => {
      if (!code) return false;
      const response  = await ngFetch('/pathways/checkIfCodeExists', { query: { code } });
      if (response.exists) {
        return currentCode === response.pathway.code;
      }
      return true;
    }
  })
});

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

export const getPathwayAddFormStructure = (pathway) => ([
  {
    name: "code",
    type: "text",
    validation: yup
      .string()
      .length(6, "Must 6 characters.")
      .required("Required")
      .uppercase("Should be upper case")
      .strict()
      .pathwayCodeIsUnique({ currentCode: pathway ? pathway.code : undefined }),
    customProps: {
      placeholder: "Pathway Code",
      label: "Pathway Code",
    },
  },
  {
    name: "name",
    type: "text",
    validation: yup.string().required("Required"),
    customProps: {
      placeholder: "Pathway Name",
      label: "Pathway Name",
    },
  },
  {
    name: "description",
    type: "text",
    validation: yup.string().required("Required"),
    customProps: {
      placeholder: "Pathway Description",
      label: "Pathway Description",
      multiline: true,
      rows: 3
    },
  },
  
])

export const getPathwayEditFormStructure = (pathway) => {
  const fields = getPathwayAddFormStructure(pathway);
  fields.push(createdAtField);
  return fields;
};