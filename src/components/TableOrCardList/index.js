import React, { Fragment } from "react"
import { useTable, useFilters, useSortBy, usePagination } from "react-table"
import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TablePagination from "@material-ui/core/TablePagination"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import { Paper, withTheme } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { compose } from "recompose"
import { connect } from "react-redux"
import get from "lodash/get"
import _ from "underscore"

const TableOrCardList = ({
  columns,
  data,
  theme,
  containerWidth,
  searchQuery,
  realData,
}) => {
  const visibleTableColumns = React.useMemo(() => {
    const getVisibleColumns = (columns, numCols) => {
      if (!numCols) {
        numCols = columns.length
      }
      const newColumns = _.filter(columns, h => h.priority <= numCols)
      const tableWidth = _.reduce(newColumns, (sum, h) => sum + h.minWidth, 0)
      if (tableWidth <= containerWidth) {
        return newColumns
      }
      if (numCols <= 1) {
        return newColumns
      }
      return getVisibleColumns(newColumns, numCols - 1)
    }
    return getVisibleColumns(columns)
  }, [containerWidth])

  const searchableKeys = React.useMemo(() => {
    return columns.filter(c => c.search).map(c => c.accessor)
  }, [columns])

  const allData = React.useMemo(() => {
    return data.map(row => {
      const searchableText = searchableKeys
        .map(key => get(row, key, ""))
        .filter(str => Boolean(str))
        .map(str => str.toString().toLowerCase())
        .join(";")
      return { ...row, searchableText }
    })
  }, [data, searchableKeys])

  const visibleData = React.useMemo(() => {
    if (!searchQuery) {
      return allData
    }
    return allData.filter(
      row => row.searchableText.indexOf(searchQuery.toLowerCase()) > -1
    )
  }, [allData, searchQuery])

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
      initialState: { pageSize: 25, pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  )

  const handleChangePage = (event, newPage) => {
    if (newPage === pageIndex + 1) {
      nextPage()
    } else if (newPage === pageIndex - 1) {
      previousPage()
    } else {
      gotoPage(newPage)
    }
  }

  const handleChangeRowsPerPage = event => {
    setPageSize(event.target.value)
  }

  const renderTable = () => (
    <Table {...getTableProps()} stickyHeader aria-label="sticky table">
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              return (
                <TableCell
                  align="center"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ fontWeight: "bold" }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()} hover>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()} align="center">
                    {cell.render("Cell")}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )

  const renderCards = () => (
    <Fragment>
      {page.map((row, i) => {
        prepareRow(row)
        return (
          <Card
            {...getTableProps()}
            variant="outlined"
            style={{ margin: 20, borderRadius: 20 }}
            key={i}
          >
            <CardContent {...getTableBodyProps()} key={i}>
              <span {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Fragment>
                      {cell.column.priority === 2 ||
                      cell.column.priority === 3 ||
                      cell.column.priority === 4 ||
                      cell.column.priority === 5 ||
                      cell.column.priority === 6 ? (
                        <div style={{ marginLeft: 20 }}>
                          {cell.column.Header} :{cell.value}
                        </div>
                      ) : cell.column.priority === 1 ? (
                        <Fragment>
                          <CardHeader
                            avatar={<Avatar>K</Avatar>}
                            titleTypographyProps={{ variant: "h5" }}
                            title={cell.value}
                          />
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </Fragment>
                  )
                })}
              </span>
            </CardContent>
          </Card>
        )
      })}
    </Fragment>
  )

  const screenAboveSm = useMediaQuery(theme.breakpoints.up("sm"))

  return (
    <TableContainer component={Paper}>
      {screenAboveSm ? renderTable() : renderCards()}
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
  )
}

export default withTheme(TableOrCardList)
