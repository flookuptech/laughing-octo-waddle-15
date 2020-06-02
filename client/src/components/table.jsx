import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  TableHead
} from "@material-ui/core";

const styles = {
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 650,
    maxWidth: 1200
  },
  root: {
    width: "100%",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 16, 
    minWidth: 100,
  }
};

const CustomTable =  ({ classes, tableHead, tbody}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    // <Paper className={classes.root}>
    <Fragment>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              {tableHead.map(function(item) {
                return (
                  <TableCell align="center" className={classes.tableHeader}>
                    {item.value}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tbody}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tbody.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Fragment> 
  );
}
export default withStyles(styles)(CustomTable);