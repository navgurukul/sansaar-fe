import React from 'react';
import moment from 'moment';
import { fromPairs } from 'lodash';
import NG_CONSTANTS from 'ng-constants';
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
      },
      disableFilters: true,

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
      disableFilters: false,
      filterElType: 'select',
    },
    {
      Header: 'Roles',
      accessor: 'rolesList',
      priority: 4,
      minWidth: 200,
      search: true,
      Cell: ({ value }) => (
        <UserRoleChips header="roles" rolesList={value} />
      ),
      disableFilters: false,
      filterElType: 'select',
      getSearchText: (value) => value.map(v => NG_CONSTANTS.roleNames[v].toLowerCase()),
      getSelectMapping: (values) => fromPairs(values.map(v => ( [v, NG_CONSTANTS.roleNames[v]] )))
    },
    {
      Header: 'Joined On',
      accessor: 'created_at',
      priority: 5,
      minWidth: 200,
      search: true,
      Cell: ({ value }) => {
        return moment(value).fromNow();
      },
      disableFilters: true,
    },
]

export default tableColumns;