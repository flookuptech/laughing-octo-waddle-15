import React from "react";
import CustomTable from "components/table";
import { TableCell, TableRow } from "@material-ui/core";

const tbody = () => {
  return null;
};
const SummaryTable = ({ tableHead }) => {
  // const tbody = transactionList.map((item, i) => {
  //   return (
  //     <TableRow>
  //       <TableCell align="center" component="th" scope="row">
  //         {i + 1}
  //       </TableCell>
  //       <TableCell align="center">{item.partyName}</TableCell>
  //       <TableCell align="center"></TableCell>
  //     </TableRow>
  //   );
  // });
  return <CustomTable tableHead={tableHead} tbody={tbody} />;
};
export default SummaryTable;
