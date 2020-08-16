import React from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { fromPairs, map } from 'lodash';

const defaultOptionsMapping = (values) => fromPairs(values.map(v => ([v,v])));

const SelectFilter = ({ column: { filterValue, preFilteredRows, setFilter, Header, id, getSelectMapping } }) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      const value = row.values[id];
      if (Array.isArray(value)) {
        value.forEach(v => options.add(v));
      } else {
        options.add(value)
      }
    });
    const optionsArr = [ ...options.values()]
    return getSelectMapping ? getSelectMapping(optionsArr) : defaultOptionsMapping(optionsArr);
  }, [id, preFilteredRows,getSelectMapping]);

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
        {map(options, (option, key) => (
          <MenuItem key={key} value={key}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFilter;