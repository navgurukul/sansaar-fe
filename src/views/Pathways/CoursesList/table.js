import moment from "moment";
import React from 'react';
import UserAvatar from "../../Users/components/UserCard/UserAvatar";

const tableColumns = [
  {
    Header: '',
    accessor: 'logo',
    priority: 1,
    minWidth: 100,
    search: false,
    Cell: ({ row, value }) => {
      const {name} = row.original
      return <UserAvatar name={name} profilePicture={value} />;
    },
    disableFilters: true,

  },
  {
    Header: "Name",
    accessor: "name",
    priority: 2,
    minWidth: 200,
    search: true,
  },
  {
    Header: "Description",
    accessor: "short_description",
    priority: 3,
    minWidth: 200,
    search: true,
  }
  // {
  //   Header: "Course Id",
  //   accessor: "course_id",
  //   priority: 2,
  //   minWidth: 200,
  //   search: true,
  // },
  // {
  //   Header: "SequenceNumber",
  //   accessor: "sequence_num",
  //   priority: 3,
  //   minWidth: 200,
  //   search: true,
  // },
  // {
  //   Header: "Created At",
  //   accessor: "created_at",
  //   priority: 4,
  //   minWidth: 200,
  //   // search: true,
  //   Cell: ({ value }) => {
  //     return moment(value).fromNow()
  //   },
  //   disableFilters: true,
  //   // getSearchText: (value) => moment(value).fromNow()
  // },
]

export default tableColumns
