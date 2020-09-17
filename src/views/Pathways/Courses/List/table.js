import React from 'react';
import UserAvatar from "../../../Users/components/UserCard/UserAvatar";

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
]

export default tableColumns
