import React from "react";
import CustomTable from "components/table";
import { TableCell, TableRow } from "@material-ui/core";

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "may",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SummaryTable = ({ tableHead, transactionList }) => {
  const tbody = transactionList.map((item, i) => {
    return (
      <TableRow key={item.userId}>
        <TableCell align="center" component="th" scope="row">
          {i + 1}
        </TableCell>
        <TableCell align="center">{monthName[item.month - 1]}</TableCell>
        <TableCell align="center">{item.complete}</TableCell>
      </TableRow>
    );
  });
  return <CustomTable tableHead={tableHead} tbody={tbody} />;
};
export default SummaryTable;
