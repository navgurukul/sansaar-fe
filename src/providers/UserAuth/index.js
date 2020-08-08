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
  })

  useEffect(() => {
    const fetchUser = async () => {
      if (!authToken) {
        setState({
          ...state,
          user: null,
          userFetched: false,
          authorized: false
        })
        return null;
      }
      const response = await ngFetch('/users/me');
      setState({
        ...state,
        user: response.user,
        userFetched: true,
        authorized: true
      });
    }
    fetchUser();
  }, [authToken]);
  
  return (
    <UserAuthContext.Provider value={state}>
      {children}
    </UserAuthContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  authToken: authSelectors.selectAuthToken(state),
})

export default connect(mapStateToProps)(UserAuthProvider);