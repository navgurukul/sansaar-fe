import React from 'react';
import { Box, withStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
const UserList = (props) => (
    <Box>
      <button onClick={props.invookeData}>kumar</button>
      <br />
      <br />
      <Link to="/users/add">Add a user</Link>
    </Box>
  );

  export default UserList;