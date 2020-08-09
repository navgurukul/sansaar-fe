import React from 'react';
import { Link } from 'react-router-dom';
import { Box, withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import TwoColumnLayout from '../../layouts/TwoColumn';
// import { connect } from 'react-redux';
// import { fetchServerData } from '../../auth/asyncActions';
// import { bindActionCreators } from 'redux';
// import { startFetchRequest, fetchFailure, selectors } from '../../auth';
import UserList from './UserList';

const styles = () => ({});

const UsersSection = ({theme}) => {

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
      component: UserList
      key: 'USERS_LIST',
    },
  ];

  const rightPaneRoutes = [
    {
      path: '/users/add',
      component: () => <Link to="/users">Close</Link>,
      key: 'USERS_ADD',
      exact: true,
    }
  ];

  return (
    <TwoColumnLayout mainPaneRoutes={mainPaneRoutes} rightPaneRoutes={rightPaneRoutes} />
  );
};


// const mapStateToProps = (state) => {
//   console.log(state, 'state from users')
//   return(
//     {
//       fetchData: selectors.selectFetchedData(state),
//     }
//   )
  
// };

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(
//     { startFetchRequest, fetchFailure, fetchServerData },
//     dispatch,
//   ),
// });

export default compose(
  // connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(UsersSection);