import React from "react";
import CustomTable from "components/table";
import { TableCell, TableRow } from "@material-ui/core";

const SummaryTable = ({ tableHead, transactionList }) => {
  const tbody = transactionList.map((item, i) => {
    return (
      <TableRow key={item.userId}>
        <TableCell align="center" component="th" scope="row">
          {i + 1}
        </TableCell>
        <TableCell align="center">
          {item.userDetails.firstName + `\n` + item.userDetails.lastName}
        </TableCell>
        <TableCell align="center">{item.count}</TableCell>
      </TableRow>
    );
  });
  return <CustomTable tableHead={tableHead} tbody={tbody} />;
};
export default SummaryTable;
