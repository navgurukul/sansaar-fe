import React, { useEffect } from "react";
import get from 'lodash/get';
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow ,
  TablePagination,
  Paper,
  withTheme,
  useMediaQuery,
  Box,
} from '@material-ui/core';
import { fromPairs, map, isEmpty, difference } from 'lodash';

import AllFilters, { FILTER_COMPONENTS, FILTER_TYPES } from './filters';
import Spacer from "../Spacer";

const TableOrCardList = ({
  tableColumns,
  data,
  theme,
  containerWidth,
  renderCard,
  onRowClick,
  scrollContainerToTop,
}) => {

  const newData = React.useMemo(() => {
    const onFilterableValueColumns = fromPairs(tableColumns.map(c => {
      if (c.filter === 'onFilterableValue') {
        return [c.accessor, c.getFilterableValue];
      }
    }).filter(c => c !== undefined));
    if (isEmpty(onFilterableValueColumns)) return data;
    return data.map(row => {
      const newRow = { ...row };
      map(onFilterableValueColumns, (getFilterableVaue, accessor) => {
        newRow[`${accessor}FilterableValue`] = getFilterableVaue(row[accessor])
      })
      return newRow;
    })
  }, [data, tableColumns]);

  const columns = React.useMemo(() => {
    return tableColumns.map(column => {
      if (column.disableFilters) {
        return column;
      }
      const filterElType = column.filterElType ? column.filterElType : 'text';
      const Filter = FILTER_COMPONENTS[filterElType];
      return { ...column, Filter }
    })
  }, [tableColumns]);

  const searchableKeys = React.useMemo(() => {
    return columns.filter(c => c.search).map(c => c.accessor)
  }, [columns]);

  const [globalSearch, setGlobalSearch] = React.useState();
  const allData = React.useMemo(() => {
    return newData.map(row => {
      const searchableText = searchableKeys
        .map(key => get(row, key, ""))
        .filter(str => Boolean(str))
        .map(str => str.toString().toLowerCase())
        .join(";")
      return { ...row, searchableText }
    })
  }, [newData, searchableKeys]);

  const visibleData = React.useMemo(() => {
    if (!globalSearch) {
      return allData
    }
    return allData.filter(
      row => row.searchableText.indexOf(globalSearch.toLowerCase()) > -1
    )
  }, [allData, globalSearch]);

  const defaultColumn = React.useMemo(() => ({
      filterElType: 'text',
      Filter: FILTER_COMPONENTS.text,
    }), []);
    
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    columns: actualColumns,
    state: { pageIndex, pageSize, rowCount = rows.length },
    toggleHideColumn,
    setHiddenColumns,
    allColumns,
  } = useTable(
    {
      // columns: visibleTableColumns,
      columns,
      data: visibleData,
      initialState: { pageSize: 25, pageIndex: 0 },
      defaultColumn,
      filterTypes: FILTER_TYPES
    },
    useFilters,
    useSortBy,
    usePagination
  );

  // Hide columns according to container size
  useEffect(() => {
    const getVisibleColumns = (columns, numCols) => {
      if (!numCols) {
        numCols = columns.length
      }
      const newColumns = columns.filter(h => h.priority <= numCols);
      const tableWidth = newColumns.reduce((sum, h) => sum + h.minWidth, 0);

      if (tableWidth <= containerWidth) {
        return newColumns.map(c => c.id);
      }
      if (numCols <= 1) {
        return newColumns.map(c => c.id);
      }
      return getVisibleColumns(newColumns, numCols - 1)
    }
    const visibleColumnsId = getVisibleColumns(allColumns);
    const allColumnIds = allColumns.map(c => c.id);
    const hiddenColumnIds = difference(allColumnIds, visibleColumnsId);
    setHiddenColumns(hiddenColumnIds);
  }, [containerWidth]);

  const handleChangePage = (event, newPage) => {
    if (newPage === pageIndex + 1) {
      nextPage()
    } else if (newPage === pageIndex - 1) {
      previousPage()
    } else {
      gotoPage(newPage)
    }
    scrollContainerToTop();
  }

  const handleChangeRowsPerPage = event => {
    setPageSize(event.target.value)
  }


  const renderTable = () => (
    <Table {...getTableProps()} stickyHeader aria-label="sticky table">
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </TableCell>
            ))}
          </TableRow>
      ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <TableRow
              {...row.getRowProps()}
              onClick={onRowClick ? () => onRowClick(row.original.id) : undefined}
              hover
            >
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  )

  const renderCards = () => (
    <React.Fragment>
      {page.map((row, i) => (
        <Box key={i} onClick={onRowClick ? () => onRowClick(row.original.id) : undefined}>
          {renderCard(row.original, i)}
        </Box>
      ))}
    </React.Fragment>
  )

  const screenAboveSm = useMediaQuery(theme.breakpoints.up('sm'))
 
  return (
    <React.Fragment>
      <AllFilters columns={actualColumns} setGlobalSearch={setGlobalSearch} globalSearchQuery={globalSearch} />
      <Spacer height={theme.spacing(2)} />
      <TableContainer component={screenAboveSm ? Paper : undefined}>
        { screenAboveSm ? renderTable() : renderCards() }
        <TablePagination
          rowsPerPageOptions={[25, 50, 75, 100]}
          component={screenAboveSm ? 'div' : Paper}
          count={rowCount}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </React.Fragment>
  )
}

export default withTheme(TableOrCardList)
