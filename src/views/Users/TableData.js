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
    Header: "ID",
    accessor: "id",
    priority: 3,
    minWidth: 200,
    search: true,
    Cell: ({ cell: { value } }) => {
      return <Fragment key={value}>{value}</Fragment>
    },
  },
  {
    Header: "Content",
    accessor: "body",
    priority: 4,
    minWidth: 200,
    search: true,
    Cell: ({ cell: { value } }) => {
      return <Fragment>{value}</Fragment>
    },
  },
  {
    Header: "Post ID",
    accessor: "postId",
    priority: 5,
    minWidth: 200,
    search: true,
    Cell: ({ cell: { value } }) => {
      return <Fragment>{value}</Fragment>
    },
  },
]

export default columns
