import React,{useState, useEffect, Fragment} from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import tableColumns from './table';
import UserCard from '../components/UserCard';
import TableOrCardList from '../../../components/TableOrCardList';
import { ngFetch } from '../../../providers/NGFetch';
import { selectors as layoutSelectors } from '../../../layouts/TwoColumn/store';
import { setAllUsers , selectors as userSelectors } from '../store';

import history from '../../../providers/routing/app-history';


function UserList({ mainPaneWidth, actions, allUsers }) {
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await ngFetch('/users', { method: 'GET'});
      actions.setAllUsers(response.users);
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

  const users = React.useMemo(() => Object.values(allUsers), [allUsers]);

  const handleRowClick = (userId) => {
    history.push(`/users/${userId}`)
  }

  return (
    <Fragment>
        
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
        onRowClick={handleRowClick}
      />

    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  mainPaneWidth: layoutSelectors.selectMainPaneWidth(state),
  allUsers: userSelectors.selectAllUsers(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setAllUsers }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);