import React from "react";
import {
  TableCell,
  TableRow
} from "@material-ui/core";
import CustomTable from 'components/table';
import Switch from 'components/switch';

const ClientTable =  ({tableHead, tenantList, handleChange}) => {
  const tbody = tenantList.map((item, i) => {
    return(
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
    );
  })
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default ClientTable;