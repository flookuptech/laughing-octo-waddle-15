import React from "react";
import CustomTable from 'components/table';

const SummaryTable =  ({tableHead}) => {
  const tbody = () => {
    return null;
  }
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default SummaryTable;