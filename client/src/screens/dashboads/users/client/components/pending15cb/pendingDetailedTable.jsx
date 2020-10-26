import React from "react";
import CustomTable from "components/table";
import { TableCell, TableRow } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";

const PendindDetailedTable = ({ tableHead, transactionList }) => {
  const tbody = transactionList.map((item, i) => {
    return (
      <TableRow>
        <TableCell align="center" component="th" scope="row">
          {i + 1}
        </TableCell>
        <TableCell align="center">{item.createdAt.split("T")[0]}</TableCell>
        <TableCell align="center">
          <a href={item.invoiceLink} target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="invoiceDownload" color="primary">
              <GetAppIcon />
            </IconButton>
          </a>
        </TableCell>
        <TableCell align="center">
          {item.userRemarks.clientRemarks === "undefined"
            ? "None"
            : item.userRemarks.clientRemarks}
        </TableCell>
        <TableCell align="center">{item.trackingNumber}</TableCell>
      </TableRow>
    );
  });
  return <CustomTable tableHead={tableHead} tbody={tbody} />;
};
export default PendindDetailedTable;
