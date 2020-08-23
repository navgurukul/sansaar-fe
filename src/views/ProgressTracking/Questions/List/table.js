// import React from "react"
import moment from "moment"
// import { fromPairs } from "lodash"

const tableColumns = [
  {
    Header: "Name",
    accessor: "name",
    priority: 1,
    minWidth: 200,
    search: true,
  },
  {
    Header: "Description",
    accessor: "description",
    priority: 2,
    minWidth: 200,
    search: true,
  },
  {
    Header: "Type",
    accessor: "type",
    priority: 3,
    minWidth: 200,
    search: true,
  },
  {
    Header: "created At",
    accessor: "created_at",
    priority: 4,
    minWidth: 200,
    search: true,
    Cell: ({ value }) => {
      return moment(value).fromNow()
    },
    disableFilters: true,
  },
]

export default tableColumns
