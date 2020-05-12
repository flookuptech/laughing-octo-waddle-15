import React from "react";
import { withStyles } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination
} from "@material-ui/core";
import TableHeaders from 'components/tableHeaders';
import Switch from 'components/switch';

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

const ClientTable =  ({ clientsList, classes, tableHead, handleChange }) => {
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
            <TableHeaders head={tableHead} />
            {console.log(clientsList)}
            <TableBody>
              {clientsList.map(function(item, i) {
              return (
                <React.Fragment>
                  <TableRow key={item._id}>
                  <TableCell align="center" component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">
                      <a href={"mailto:" + item.email}>{item.email}</a>
                    </TableCell>
                    <TableCell align="center">{item.designation}</TableCell>
                    <TableCell align="center">{item.contact}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">
                      <Switch
                          // onChangeHandler={() => handleChange(item)}
                          checked={true}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default withStyles(styles)(ClientTable);
