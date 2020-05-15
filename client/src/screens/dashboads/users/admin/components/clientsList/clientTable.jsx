import React from "react";
import {
  TableCell,
  TableRow
} from "@material-ui/core";
import CustomTable from 'components/table';
import Switch from 'components/switch';

const ClientTable =  ({tableHead, clientsList, handleChange}) => {
  const tbody = clientsList.map((item, i) => {
    return(
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
    );
  })
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default ClientTable;