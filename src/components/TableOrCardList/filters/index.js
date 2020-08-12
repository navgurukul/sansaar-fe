import React from 'react';


import { Grid, TextField, Box, withStyles } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SelectFilter from './SelectFilter';
import DefaultColumnFilter from './DefaultColumnFilter';

export const FILTER_COMPONENTS = {
  text: DefaultColumnFilter,
  select: SelectFilter,
};

export const FILTER_TYPES = {
  onFilterableValue: (rows, id, filterValue) => {
    return rows.filter(row => {
      const value = row.original[`${id}FilterableValue`];
      if (!value) {
        return true;
      }
      if (Array.isArray(value)) {
        return value.map(v => v.indexOf(filterValue))
        .filter(v => v > -1)
          .length > 0
      }
      return value.indexOf(filterValue) > -1;
    });
  },
}

const styles = (theme) => ({
  filterInput: {
    width: '100%',
  },
  filterToggleContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  }
});

const AllFilters = ({ classes, columns, setGlobalSearch, globalSearchQuery }) => {

  const [filtersVisible, setFilterVisible] = React.useState(false);
  // const [searchQuery, setSearchQuery] = React.useState();
  const  onSearchQueryChange = e => {
    const value = e.target.value || undefined;
    setGlobalSearch(value);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} lg={6}>
        <TextField
          defaultValue={globalSearchQuery}
          onChange={onSearchQueryChange}
          placeholder="Search everything..."
          variant="outlined"
          className={classes.filterInput}
        />
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.filterToggleContainer} onClick={() => setFilterVisible(!filtersVisible)}>
          {filtersVisible ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
          Show Filters
        </Box>
      </Grid>
      {filtersVisible && (
        <React.Fragment>
          {columns.map((column, i) => {
            if (!column.canFilter) return null
            return (
              <Grid item xs={12} md={4} lg={3} key={i}>
                {column.render("Filter")}
              </Grid>
            );
          })} 
        </React.Fragment>
      )}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(AllFilters);