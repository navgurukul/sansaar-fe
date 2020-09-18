import * as yup from "yup"
import { ngFetch } from "../../../providers/NGFetch"

yup.addMethod(yup.string, "pathwayCodeIsUnique", function CODE({
  currentCode,
}) {
  return this.test({
    name: "pathwayCodeUnique",
    message: "Code is taken by another pathway.",
    test: async (code = "") => {
      if (!code) return false
      if (code.length > 6) return false
      const response = await ngFetch("/pathways/checkIfCodeExists", {
        query: { code },
      })
      if (response.exists) {
        return currentCode === response.pathway.code
      }
      return true
    },
  })
})

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

export const getPathwayAddFormStructure = (pathway, trackingEnabled) => {
  return [
    {
      name: "code",
      type: "text",
      validation: yup
        .string()
        .length(6, "Must be 6 characters.")
        .required("Required")
        .uppercase("Should be upper case")
        .strict()
        .pathwayCodeIsUnique({
          currentCode: pathway ? pathway.code : undefined,
        }),
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
        rows: 3,
      },
    },
    {
      name: "tracking_enabled",
      options: [
        { value: "true", label: "YES" },
        { value: "false",label: "NO" },
      ],
      validation: yup.string().required("required"),
      type: "radio",
      labelText: "Tracking enabled",
      customProps:{defaultValue:''}
    },
    {
      name: "tracking_frequency",
      type: "select",
      validation: yup.string().when("tracking_enabled",{is:Boolean(trackingEnabled), then: yup.string().required("Required").oneOf(["weekly","fortnightly","monthly"], "Please select one"), otherwise:""}),
      options: [{ name: "weekly", value: "weekly" },{ name: "fortnightly", value: "Fortnightly (Every 2 weeks)" },{ name: "monthly", value: "Monthly" }],
      customProps: {
        id: "",
        label: "select a tracking frequency",
        defaultValue: "weekly",
        disabled: trackingEnabled === "false",
      },
    },
    {
      name: "tracking_day_of_week",
      type: "select",
      validation:
      yup.string().when("tracking_enabled",{is:Boolean(trackingEnabled), then: yup.string().required("Required").oneOf(["0", "1", "2", "3", "4", "5", "6"], "Please select one"), otherwise:""}),
      options: [
        { name: "0", value: "Sunday" },
        { name: "1", value: "Monday" },
        { name: "2", value: "Tuesday" },
        { name: "3", value: "Wednesday" },
        { name: "4", value: "Thursday" },
        { name: "5", value: "Friday" },
        { name: "6", value: "Saturday" },
      ],
      customProps: {
        id: "",
        label: "select a tracking day of week",
        defaultValue: "0",
        disabled: trackingEnabled === "false",
      },
    },
    {
      name: "tracking_days_lock_before_cycle",
      type: "select",
      validation: yup.string().when("tracking_enabled",{is:Boolean(trackingEnabled), then: yup.string().required("Required").oneOf(["1", "2", "3", "4", "5"], "Please select one"), otherwise:""}),
      options: [
        { name: "1", value: "one" },
        { name: "2", value: "two" },
        { name: "3", value: "three" },
        { name: "4", value: "four" },
        { name: "5", value: "five" },
      ],
      customProps: {
        id: "",
        label: "select a tracking days lock before cycle",
        defaultValue: "1",
        disabled: trackingEnabled === "false",
      },
    },
  ]
}

export const getPathwayEditFormStructure = (pathway, trackingEnabled) => {
  const fields = getPathwayAddFormStructure(pathway, trackingEnabled)
  fields.push(createdAtField)
  return fields
}
