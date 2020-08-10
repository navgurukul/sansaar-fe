import React,{useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { TextField, Card, CardContent, Avatar, Typography, Box } from '@material-ui/core';
import { connect } from 'react-redux';

import tableColumns from './table';
import UserCard from '../components/UserCard';
import TableOrCardList from '../../../components/TableOrCardList';
import { ngFetch } from '../../../providers/NGFetch';
import { selectors as layoutSelectors } from '../../../layouts/TwoColumn/store';



function UserList({ mainPaneWidth }) {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch('/users', { method: 'GET'});
      setUsers(response.users);
    };
    fetchData();
  }, []);

  const [searchQuery, setSearch] = useState('')
  const  onSearchQueryChange = e => {
    const value = e.target.value || undefined;
    setSearch(value);
  };

  const userCard = (user, key) => (
    <UserCard
      key={key}
      id={user.id}
      name={user.name}
      profilePicture={user.profile_picture}
      rolesList={user.rolesList}
      eMail={user.email}
      joinedAt={user.createdAt}
    />
  )

  return(
    <Fragment>
      <Link to="/users/add">Add a user</Link>
        
      <TextField
        defaultValue={searchQuery}
        onChange={onSearchQueryChange}
        placeholder="Search"
      />

      <TableOrCardList
        columns={tableColumns}
        searchQuery={searchQuery}
        data={users}
        containerWidth={mainPaneWidth}
        renderCard={userCard}
      />

    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
});

export default connect(mapStateToProps)(UserList);