import React, { Fragment } from "react"
import TableCell from "@material-ui/core/TableCell"

const columns = [
  {
    Header: "Name",
    accessor: "name",
    priority: 1,
    minWidth: 200,
    search: true,
    Cell: ({ cell: { value } }) => {
      return <Fragment key={value}>{value}</Fragment>
    },
  },
  {
    Header: "Email",
    accessor: "email",
    priority: 2,
    minWidth: 200,
    search: true,
    Cell: ({ cell: { value } }) => {
      return <Fragment key={value}>{value}</Fragment>
    },
  },
  {
    Header: "Gender",
    accessor: "gender",
    priority: 3,
    minWidth: 200,
    search: true,
    Cell: ({ cell: { value } }) => {
      return <Fragment key={value}>{ value === 1 ? 'Female' : 'Male'}</Fragment>
    },
  },
  {
    Header: "State",
    accessor: "state",
    priority: 4,
    minWidth: 200,
    search: true,
    Cell: ({ cell: { value } }) => {
      return <Fragment>{value}</Fragment>
    },
  },
  {
    Header: "Date Of Birth",
    accessor: "dob",
    priority: 5,
    minWidth: 200,
    search: true,
    Cell: ({ cell: { value } }) => {
      return <Fragment>{value}</Fragment>
    },
  },
]

export default columns
