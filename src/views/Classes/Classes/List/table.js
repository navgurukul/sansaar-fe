import React from "react"
import moment from "moment"
import {Button} from "@material-ui/core";
import { toTitleCase } from "../../../../helpers"


const tableColumns = [
  {
    Header: "Register/Unregister",
    accessor: "",
    priority: 1,
    minWidth: 200,
    search: true,
    Cell: ({ value }) => {
      return (<Button variant="contained" color="primary">Register</Button>)
    },
  },
  {
    Header: "Title",
    accessor: "title",
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
    priority: 4,
    minWidth: 200,
    disableFilters: true,
  },
  {
    Header: "Facilitator",
    accessor: "facilitator.name",
    priority: 3,
    minWidth: 200,
  },
  {
    Header: "Language",
    accessor: "lang",
    priority: 5,
    minWidth: 200,
  },
  {
    Header: "Class type",
    accessor: "class_type",
    priority: 6,
    minWidth: 200,
    disableFilters: true,
  },
  {
    Header: "Created At",
    accessor: "created_at",
    priority: 7,
    minWidth: 200,
    Cell: ({ value }) => {
      return moment(value).fromNow()
    },
    disableFilters: true,
    getSearchText: value => moment(value).fromNow(),
  },
]

export default tableColumns
