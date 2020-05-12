import React from "react";
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
import TableHeaders from "components/tableHeaders.jsx";
import Switch from "components/switch";

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

const TenantTable = ({tenantList, classes, tableHead, handleChange}) => {
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
          <TableBody>
            {console.log(tenantList)}
          {tenantList.map(function(item, i) {
            return (
              <React.Fragment>
                <TableRow key={item._id}>
                  <TableCell component="th" sope="row" align="center">
                    { i + 1 }
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    <a href={"mailto:" + item.email}>{item.email}</a>
                  </TableCell>
                  <TableCell align="center">{item.contact}</TableCell>
                  <TableCell align="center">{item.companyName}</TableCell>
                  <TableCell align="center">
                    <a href={"mailto:" + item.orgEmail}>{item.orgEmail}</a>
                  </TableCell>
                  <TableCell align="center">{item.panNumber}</TableCell>
                  <TableCell align="center">{item.dateCreated.split("T")[0]}</TableCell>
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tenantList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper> 
  );
}
export default withStyles(styles)(TenantTable);
