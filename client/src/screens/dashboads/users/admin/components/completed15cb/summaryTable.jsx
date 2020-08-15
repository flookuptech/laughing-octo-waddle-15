import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import CustomTable from "components/table";

const tbody = () => {
  return null;
};

const SummaryTable = ({ tableHead }) => {
  return <CustomTable tableHead={tableHead} tbody={tbody} />;
};
export default SummaryTable;
