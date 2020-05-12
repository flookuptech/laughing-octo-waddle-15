import React, { Fragment } from "react";
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination
} from "@material-ui/core";
import TableHeader from 'components/tableHeaders';

const styles = {
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 650,
  },
  root: {
    width: "100%",
  }
};

const HomeTable =  ({ classes, tableHead }) => {
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
    <Paper className={classes.root}>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHeader head={tableHead} />
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        // count={clientsList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default withStyles(styles)(HomeTable);