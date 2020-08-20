import moment from "moment"
import {toTitleCase} from '../../../helpers';

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
    Cell :({value}) => {
      return toTitleCase(value)
    }
  },
  {
    Header: "Description",
    accessor: "description",
    priority: 3,
    minWidth: 200,
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    priority: 4,
    minWidth: 200,
    // search: true,
    Cell: ({ value }) => {
      return moment(value).fromNow()
    },
    disableFilters: true,
  },
]

export default tableColumns
