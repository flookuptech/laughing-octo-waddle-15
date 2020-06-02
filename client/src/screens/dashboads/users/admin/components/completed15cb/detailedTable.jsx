import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CustomTable from 'components/table';
import {
  TableCell,
  TableRow,
  Button
} from "@material-ui/core";


const trackingNo = 123456;
const DetailedTable =  ({tableHead }) => {
  const tbody = (
      <TableRow>
        <TableCell align="center" component="th" scope="row">
          1
        </TableCell>
        <TableCell align="center">
          Hritik
        </TableCell>
        <TableCell align="center">
          2020-05-05
        </TableCell>
        <TableCell align="center">
          123456  
        </TableCell>
        <TableCell align="center">
          <Button component={Link} to={`/dashboard/completed15CB/${trackingNo}`} name="Open" variant="outlined" color="primary">
            Open
          </Button>
        </TableCell>
      </TableRow>
  );       
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default DetailedTable;