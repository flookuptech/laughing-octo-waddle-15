import React from "react";
import CustomTable from 'components/table';

const PendindDetailedTable =  ({tableHead}) => {
  const tbody = () => {
    return null;
  }
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default PendindDetailedTable;