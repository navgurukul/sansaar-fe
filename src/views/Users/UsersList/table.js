import React from 'react';
import moment from 'moment';
import { Avatar, Chip } from '@material-ui/core';

import { getInitialsFromName } from '../../../helpers'
import UserRoleChips from '../components/UserCard/UserRoleChips';
import UserAvatar from '../components/UserCard/UserAvatar';

const tableColumns = [
    {
      Header: '',
      accessor: 'profile_picture',
      priority: 3,
      minWidth: 100,
      search: false,
      Cell: ({ row, value }) => {
        const { name } = row.original;
        return <UserAvatar name={name} profilePicture={value} />;
      }
    },
    {
      Header: 'Name',
      accessor: 'name',
      priority: 1,
      minWidth: 200,
      search: true,
    },
    {
      Header: 'Email',
      accessor: 'email',
      priority: 2,
      minWidth: 200,
      search: true,
    },
    {
      Header: 'Roles',
      accessor: 'rolesList',
      priority: 4,
      minWidth: 200,
      Cell: ({ value }) => (
        <UserRoleChips rolesList={value} />
      ),
    },
    {
      Header: 'Joined On',
      accessor: 'createdAt',
      priority: 5,
      minWidth: 200,
      search: true,
      Cell: ({ value }) => {
        return moment(value).fromNow();
      }
    },
]

export default tableColumns;