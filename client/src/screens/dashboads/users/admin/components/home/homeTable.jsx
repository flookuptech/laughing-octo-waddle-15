import React from "react";
import {
  TableCell,
  TableRow
} from "@material-ui/core";
import CustomTable from 'components/table';

const HomeTable =  ({tableHead, clientsList }) => {
  const tbody = clientsList.map((item, i) => {
    return(
      <TableRow key={item._id}>
        <TableCell align="center" component="th" scope="row" >
          {i + 1}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {item.name}
        </TableCell>
        <TableCell align="center" component="th" scope="row" >
        </TableCell>
        <TableCell align="center" component="th" scope="row">
        </TableCell>
        <TableCell align="center" component="th" scope="row">
        </TableCell>
      </TableRow>
    );
  })
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default HomeTable;