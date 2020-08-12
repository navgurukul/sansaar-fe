import React from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

const SelectFilter = ({ column: { filterValue, preFilteredRows, setFilter, Header, id } }) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => options.add(row.values[id]));
    return [ ...options.values() ];
  }, [id, preFilteredRows]);

  return (
    <FormControl variant="outlined" style={{ width: '100%' }}>
      <InputLabel id={`${id}-filter-label`}>{Header}</InputLabel>
      <Select
        labelId={`${id}-filter-label`}
        id={`${id}-select`}
        value={filterValue || "all"}
        onChange={e => {
          if (e.target.value === "all") {
            setFilter(undefined);
          } else {
            setFilter(e.target.value);
          }
        }}
      >
        <MenuItem value="all">All</MenuItem>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFilter;