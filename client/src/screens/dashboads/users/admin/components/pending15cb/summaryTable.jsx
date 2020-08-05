import React from "react";
import CustomTable from 'components/table';
import {
  TableCell,
  TableRow
} from "@material-ui/core";

const tbody = (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        1
      </TableCell>
      <TableCell align="center">
        Hritik
      </TableCell>
      <TableCell align="center">
        15
      </TableCell>
    </TableRow>       
);

const SummaryTable =  ({tableHead}) => {
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default SummaryTable;