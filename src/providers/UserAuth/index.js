import React, { createContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { selectors as authSelectors } from '../../auth';
import { ngFetch } from '../NGFetch';

export const UserAuthContext = createContext();

const UserAuthProvider = ({ children, authToken }) => {
  const [state, setState] = useState({
    user: null,
    userFetched: false,
    authorized: authToken !== undefined || authToken !== null,
    editableRoles: [],
  });

  
  const fetchUser = async () => {
    if (!authToken) {
      setState({
        user: null,
        userFetched: false,
        authorized: false
      })
    } else {
      const response = await ngFetch('/users/me');
      setState({
        user: response.user,
        userFetched: true,
        authorized: true,
      });
    }
  }
  
  const refreshUserDetails = async () => {return fetchUser();}
  
  useEffect(() => {
    fetchUser();
  }, [authToken]);
  
  return (
    <UserAuthContext.Provider value={{ ...state, refreshUserDetails }}>
      {children}
    </UserAuthContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  authToken: authSelectors.selectAuthToken(state),
})

export default connect(mapStateToProps)(UserAuthProvider);