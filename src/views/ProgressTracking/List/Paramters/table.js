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
    Header: "Minimum Value",
    accessor: "min_range",
    priority: 4,
    minWidth: 200,
    disableFilters: true,
    Cell: ({ row, value }) => {
      const {type} = row.original
      return (type === 'boolean' ? null : value)
    },
  },
  {
    Header: "Maximum Value",
    accessor: "max_range",
    priority: 5,
    minWidth: 200,
    disableFilters: true,
    Cell: ({ row, value }) => {
      const {type} = row.original
      return (type === 'boolean' ? null : value)
    },
  },
  {
    Header: "created At",
    accessor: "createdAt",
    priority: 6,
    minWidth: 200,
    search: true,
    Cell: ({ value }) => {
      return moment(value).fromNow()
    },
    disableFilters: true,
  },
]

export default tableColumns
