import React from "react";
import { withStyles } from "@material-ui/core";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

const styles = {
  tableHeader: {
    fontWeight: "bold",
    fontSize: 16,
    minWidth: 200,
  }
};

const TableHeader =  ({ classes, head }) => {
  return (
    <TableHead>
      <TableRow>
        {head.map(function(item) {
          return (
            <TableCell align="center" className={classes.tableHeader}>
              {item.value}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
export default withStyles(styles)(TableHeader);
