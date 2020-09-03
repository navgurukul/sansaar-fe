import React from 'react';
import { FormControl, Select, InputLabel, MenuItem,OutlinedInput   } from '@material-ui/core';
import { fromPairs, map } from 'lodash';

const defaultOptionsMapping = (values) => fromPairs(values.map(v => ([v,v])));

const SelectFilter = ({ column: { filterValue, preFilteredRows, setFilter, Header, id, getSelectMapping } }) => {

  const options = React.useMemo(() => {
    const optionsToVisible = new Set();
    preFilteredRows.forEach(row => {
      const value = row.values[id];
      if (Array.isArray(value)) {
        value.forEach(v => optionsToVisible.add(v));
      } else {
        optionsToVisible.add(value)
      }
    });
    const optionsArr = [ ...optionsToVisible.values()]
    return getSelectMapping ? getSelectMapping(optionsArr) : defaultOptionsMapping(optionsArr);
  }, [id, preFilteredRows,getSelectMapping]);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


  return (
    <FormControl variant="outlined" style={{ width: '100%' }}>
      <InputLabel ref={inputLabel} id={`${id}-filter-label`}>
        {Header}
      </InputLabel>
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
        input={(
          <OutlinedInput
            labelWidth={labelWidth}
            name={Header}
            id={`${id}-filter-label`}
          />
          )}
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