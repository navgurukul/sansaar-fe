
import React from "react";
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
  Box
} from '@material-ui/core';

const TableOrCardList = ({
  columns,
  data,
  theme,
  containerWidth,
  searchQuery,
  renderCard,
}) => {

  const visibleTableColumns = React.useMemo(() => {
    const getVisibleColumns = (columns, numCols) => {
      if (!numCols) {
        numCols = columns.length;
      }
      const newColumns = columns.filter(h => h.priority <= numCols);
      const tableWidth = newColumns.reduce((sum, h) => sum + h.minWidth, 0);
      if (tableWidth <= containerWidth) {
        return newColumns;
      } if (numCols <= 1) {
        return newColumns;
      }
      return getVisibleColumns(newColumns, numCols - 1);
    }
    return getVisibleColumns(columns);
  }, [containerWidth]);

  const searchableKeys = React.useMemo(() => {
    return columns.filter(c => c.search).map(c => c.accessor);
  }, [columns]);

  const allData = React.useMemo(() => {
    return data.map(row => {
      const searchableText = searchableKeys.map(key => get(row, key, ''))
        .filter(str => Boolean(str))
        .map(str => str.toString().toLowerCase())
        .join(';');
      return { ...row, searchableText };
    });
  }, [data, searchableKeys]);


  const visibleData = React.useMemo(() => {
    if (!searchQuery) {
      return allData;
    }    
    return allData.filter((row) => row.searchableText.indexOf(searchQuery.toLowerCase()) > -1)
  }, [allData, searchQuery]);

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
    state: { pageIndex, pageSize, rowCount = rows.length },
  } = useTable(
    {
      columns: visibleTableColumns,
      data: visibleData,
      initialState: {pageSize : 25, pageIndex: 0 }
    },
    useFilters,
    useSortBy,
    usePagination,
  );
  
  const handleChangePage = (event,newPage) => {
    if (newPage === pageIndex + 1) {
      nextPage()
    } else if (newPage === pageIndex - 1) {
      previousPage()
    } else {
      gotoPage(newPage)
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
  };
  

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
            <TableRow {...row.getRowProps()} hover>
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
  );

  const renderCards = () => (
    <React.Fragment>
      {page.map((row, i) => (
        <Box key={i}>
          {renderCard(row.original, i)}
        </Box>
      ))}
    </React.Fragment>
  )

  const screenAboveSm = useMediaQuery(theme.breakpoints.up('sm'))
 
  return (
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
  );
}

export default withTheme(TableOrCardList);