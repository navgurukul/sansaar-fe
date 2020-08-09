import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, withStyles, Button } from '@material-ui/core';
import { compose } from 'recompose';
import TwoColumnLayout from '../../layouts/TwoColumn';
import { connect } from 'react-redux';
import { fetchServerData } from '../../auth/asyncActions';
import { bindActionCreators } from 'redux';
import { startFetchRequest, fetchFailure, selectors } from '../../auth';
import UserList from './UserList';

const styles = () => ({});

const UsersSection = (props) => {
  const {theme, actions , fetchData} = props;
  // console.log(fetchData, "Pralhad")
  const invookeData = (data) => actions.fetchServerData(data)
  console.log(fetchData, "Pralhad")

  const mainPaneRoutes = [
    {
      path: '/users/detail/add',
      component: () => (<Box style={{ padding: theme.spacing(2) }}>{'Detailed add'}</Box>),
      exact: false,
    },
    {
      path: '/users',
      exact: false,
      component: () => (<UserList invookeData={invookeData}/> ) 
    },
  ];

  const rightPaneRoutes = [
    {
      path: '/users/add',
      component: () => <Link to="/users">Close</Link>,
      exact: true,
    }
  ];

  return (
    <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
  );
};


const mapStateToProps = (state) => {
  console.log(state, 'state from users')
  return(
    {
      fetchData: selectors.selectFetchedData(state),
    }
  )
  
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { startFetchRequest, fetchFailure, fetchServerData },
    dispatch,
  ),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(UsersSection);