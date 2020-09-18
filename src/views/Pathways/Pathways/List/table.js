import moment from "moment"
import { fromPairs } from "lodash"
import NG_CONSTANTS from "ng-constants"
import { toTitleCase } from "../../../../helpers"

const tableColumns = [
  {
    Header: "Code",
    accessor: "code",
    priority: 1,
    minWidth: 200,
    search: true,
  },
  {
    Header: "Name",
    accessor: "name",
    priority: 2,
    minWidth: 200,
    search: true,
    Cell: ({ value }) => {
      return toTitleCase(value)
    },
  },
  {
    Header: "Description",
    accessor: "description",
    priority: 3,
    minWidth: 200,
  },
  {
    Header: "Tracking Enabled",
    accessor: "tracking_enabled",
    priority: 4,
    minWidth: 200,
    search: true,
    disableFilters: true,
    Cell: ({ value }) => {
      let enabled=""
      if (value === true ){
        enabled ="Yes"
      }
      else{
        enabled ="No"
      }
      return enabled
    },
    getSearchText: (value) => value === true ? "yes" : "no",
  },
  {
    Header: "Tracking Frequency",
    accessor: "tracking_frequency",
    priority: 5,
    minWidth: 200,    
    search: true,
    disableFilters: true,
    Cell: ({ row,value }) => {
      return row.original.tracking_enabled === false ?  "" : value
    },

  },
  {
    Header: "Tracking Day of week",
    accessor: "tracking_day_of_week",
    priority: 6,
    minWidth: 200,
    search: true,
    disableFilters: false,
    filterElType: "select",
    getSelectMapping: values =>
      fromPairs(values.map(v => [v, NG_CONSTANTS.trackingDays[v]])),
    Cell: ({ row,value }) => {
      return row.original.tracking_enabled === false ?  "" : NG_CONSTANTS.progressTracking.trackingDayOfWeek[value]
    },
    getSearchText: (value) => (value === 0 || value) && NG_CONSTANTS.progressTracking.trackingDayOfWeek[value].toLowerCase(),
  },
  {
    Header: "Tracking Day of lock before cycle",
    accessor: "tracking_days_lock_before_cycle",
    priority: 7,
    minWidth: 200,
    disableFilters: true,
    search: true,
    Cell: ({ row,value }) => {
      return row.original.tracking_enabled === false ?  "" : value
    },
  },
  {
    Header: "Created At",
    accessor: "created_at",
    priority: 8,
    minWidth: 200,
    Cell: ({ value }) => {
      return moment(value).fromNow()
    },
    disableFilters: true,
  },
]

export default tableColumns 
