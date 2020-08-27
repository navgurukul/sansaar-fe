import moment from "moment";

const tableColumns = [
  {
    Header: "Name",
    accessor: "courses.name",
    priority: 1,
    minWidth: 200,
    search: true,
  },
  {
    Header: "Course Id",
    accessor: "course_id",
    priority: 2,
    minWidth: 200,
    search: true,
  },
  {
    Header: "SequenceNumber",
    accessor: "courses.sequence_num",
    priority: 3,
    minWidth: 200,
    search: true,
  },
  {
    Header: "Created At",
    accessor: "created_at",
    priority: 4,
    minWidth: 200,
    // search: true,
    Cell: ({ value }) => {
      return moment(value).fromNow()
    },
    disableFilters: true,
    getSearchText: (value) => moment(value).fromNow()
  },
]

export default tableColumns