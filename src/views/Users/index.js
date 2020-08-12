import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ngFetch } from '../../providers/NGFetch';
import { Box, withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import TwoColumnLayout from '../../layouts/TwoColumn';
import UsersList from './UsersList';
import UserEdit from './UserEdit';
import UserAdd from './UserAdd';
const styles = () => ({});

const UsersSection = ({theme}) => {

  const [data, setData] =useState([]);
  useEffect( () => {
      const fetchData = async () => {
          const result = await ngFetch('http://join.navgurukul.org/api/students', { method: 'GET'})
          setData(result.data);
      }; fetchData()       
  }, []);

  console.log(data, 'data here')

  const mainPaneRoutes = [
    {
      path: '/users/detail/add',
      component: () => (<Box style={{ padding: theme.spacing(2) }}>Detailed add</Box>),
      key: 'DETAIL_USER_ADD',
      exact: false,
    },
    {
      path: '/users',
      exact: false,
      component: () => <UsersList data={data}/>,
      key: 'USERS_LIST',
    },
  ];

  const rightPaneRoutes = [
    {
      path: '/users/add',
      component: () => <UserAdd />,
      key: 'USERS_ADD',
      exact: true,
    },
    {
      path: '/users/edit/userid',
      component: UserEdit,
      key: 'USERS_ADD',
      exact: true,
    }
  ];

  return (
    <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
  );
};


export default compose(
  withStyles(styles, { withTheme: true })
)(UsersSection);