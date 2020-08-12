import React from 'react';
import { TextField } from '@material-ui/core';

const DefaultColumnFilter = ({ column: { filterValue, setFilter, Header }, }) => {
  return (
    <TextField
      style={{ width: '100%' }}
      label={Header}
      variant="outlined"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    />
  );
}

export default DefaultColumnFilter;