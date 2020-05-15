import React from "react";
import CustomTable from 'components/table';
import { adminDetailedTableHead } from 'components/tableHead';

const DetailedTable =  () => {
  const tbody = () => {
      return null;
  }      
  return (
    <CustomTable tableHead={adminDetailedTableHead} tbody={tbody} />
  );
}
export default DetailedTable;