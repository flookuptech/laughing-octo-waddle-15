import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import CustomTable from "components/table";
import { LinearBar } from "components/linearBar.jsx";

const HomeTable = ({ tableHead, pendingTransactions }) => {
  const tbody = pendingTransactions.map((item, i) => {
    return (
      <TableRow key={item._id}>
        <TableCell align="center" component="th" scope="row">
          {i + 1}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {item.clientDetails[0].userDetails.firstName +
            `\n` +
            item.clientDetails[0].userDetails.lastName}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          <LinearBar
            completed={item.clientDetails[0].totalTranscations}
            pending={item.count}
          />
        </TableCell>
      </TableRow>
    );
  });
  return <CustomTable tableHead={tableHead} tbody={tbody} />;
};
export default HomeTable;
