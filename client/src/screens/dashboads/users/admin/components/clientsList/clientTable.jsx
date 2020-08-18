import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import CustomTable from "components/table";
import Switch from "components/switch";

const ClientTable = ({ tableHead, clientsList, handleChange }) => {
  const tbody = clientsList.map((item, i) => {
    return (
      <TableRow key={item._id}>
        <TableCell align="center" component="th" scope="row">
          {i + 1}
        </TableCell>
        <TableCell align="center">
          {item.userDetails.firstName + `\n` + item.userDetails.lastName}
        </TableCell>
        <TableCell align="center">
          <a href={"mailto:" + item.userDetails.email}>
            {item.userDetails.email}
          </a>
        </TableCell>
        <TableCell align="center">{item.userDetails.designation}</TableCell>
        <TableCell align="center">{item.userDetails.phone}</TableCell>
        <TableCell align="center">{item.createdAt.split("T")[0]}</TableCell>
        <TableCell align="center">
          <Switch
            // onChangeHandler={() => handleChange(item)}
            checked={true}
          />
        </TableCell>
      </TableRow>
    );
  });
  return <CustomTable tableHead={tableHead} tbody={tbody} />;
};
export default ClientTable;
