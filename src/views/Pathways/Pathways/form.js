import * as yup from "yup"
import NG_CONSTANTS from "ng-constants"
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
  const trackingDayKeys=Object.keys(NG_CONSTANTS.progressTracking.trackingDayOfWeek)
  const optionsListForTrackingDays = []
  let optionsForTrackingDays= trackingDayKeys.forEach(eachKey =>
    optionsListForTrackingDays.push({ value: NG_CONSTANTS.progressTracking.trackingDayOfWeek[eachKey], name: eachKey  })
    )
    const optionsCanSelectForTrackingDays = optionsListForTrackingDays
    ? optionsListForTrackingDays.map(option => option.name)
    : []

  optionsForTrackingDays=[...optionsListForTrackingDays]

  const trackingFrequencyKeys=Object.keys(NG_CONSTANTS.progressTracking.trackingFrequency)
  const optionsListForTrackingFrequency = []
  let optionsForTrackingFrequency= trackingFrequencyKeys.forEach(eachKey =>
    optionsListForTrackingFrequency.push({ value: NG_CONSTANTS.progressTracking.trackingFrequency[eachKey], name: eachKey  })
    )
    const optionsCanSelectForTrackingFrequency = optionsListForTrackingFrequency
    ? optionsListForTrackingFrequency.map(option => option.name)
    : []

    optionsForTrackingFrequency=[...optionsListForTrackingFrequency]


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
      validation: yup.string().when("tracking_enabled",{is:Boolean(trackingEnabled), then: yup.string().required("Required").oneOf(optionsCanSelectForTrackingFrequency, "Please select one"), otherwise:""}),
      options: optionsForTrackingFrequency,
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
      yup.string().when("tracking_enabled",{is:Boolean(trackingEnabled), then: yup.string().required("Required").oneOf(optionsCanSelectForTrackingDays, "Please select one"), otherwise:""}),
      options:optionsForTrackingDays,
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
