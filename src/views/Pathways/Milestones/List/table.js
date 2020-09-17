import moment from "moment"
import { toTitleCase } from "../../../../helpers"

const tableColumns = [
  {
    Header: "Name",
    accessor: "name",
    priority: 1,
    minWidth: 200,
    search: true,
    Cell: ({ value }) => {
      return toTitleCase(value)
    },
  },
  {
    Header: "Description",
    accessor: "description",
    priority: 2,
    minWidth: 200,
  },
  {
    Header: "Created At",
    accessor: "created_at",
    priority: 3,
    minWidth: 200,
    Cell: ({ value }) => {
      return moment(value).fromNow()
    },
    disableFilters: true,
    getSearchText: value => moment(value).fromNow(),
  },
]

export default tableColumns
