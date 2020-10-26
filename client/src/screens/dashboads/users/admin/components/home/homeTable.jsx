import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import CustomTable from "components/table";
import { LinearBar } from "components/linearBar.jsx";

const HomeTable = ({ tableHead, totalTransactions }) => {
  const tbody = totalTransactions.map((item, i) => {
    return (
      <TableRow key={item._id}>
        <TableCell align="center" component="th" scope="row">
          {i + 1}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {item.userDetails.firstName + `\n` + item.userDetails.lastName}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          <LinearBar total={item.total} completed={item.complete} />
        </TableCell>
      </TableRow>
    );
  });
  return <CustomTable tableHead={tableHead} tbody={tbody} />;
};
export default HomeTable;
