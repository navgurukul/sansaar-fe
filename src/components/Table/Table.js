
import React, {Fragment} from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

export default function Tables(props) {
  const { columns, data, WidthMatches }= props;
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // setFilter,
    page,
    // canPreviousPage,
    // canNextPage,
    // pageOptions,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, rowCount = rows.length },
    
  } = useTable(
    {
      columns,
      data,
      initialState: {pageSize : 5,pageIndex: 0 }
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


  // Render the UI for your table
  return (

    <TableContainer style={{height: 500}}>

      {
      WidthMatches ? (
        <Table {...getTableProps()} stickyHeader aria-label="sticky table">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                return (
                  <TableCell
                    align="center"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{fontWeight:'bold'}}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                    </span>

                  </TableCell> 
                
                );
              })}
              </TableRow>
          ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} hover>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()} align="center">
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

      : (
        <Fragment>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Card {...getTableProps()} variant="outlined" style={{margin:20, borderRadius:20}} key={i}> 
                <CardContent {...getTableBodyProps()} key={i}>
                  <span {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return(
                        <Fragment>
                          {cell.column.priority === 2 || cell.column.priority === 3 || cell.column.priority === 4 || 
                            cell.column.priority  === 5 || cell.column.priority === 6? (
                              <div style={{marginLeft:20}}>
                                {cell.column.Header}
                                {' '}
                                :
                                {cell.value}
                              </div>
                          )
                           : cell.column.priority === 1 ? (
                             <Fragment>
                               <CardHeader
                                 avatar={
                                   <Avatar>K</Avatar>
                           }
                                 titleTypographyProps={{variant:'h5' }}
                                 title={cell.value}
                               />
                             </Fragment>
                         ) : ''
                        
                          }
                        </Fragment>
                      )
                      })}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </Fragment>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rowCount}
        rowsPerPage={pageSize}
        page={pageIndex}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}



