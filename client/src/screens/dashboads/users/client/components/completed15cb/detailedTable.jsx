import React from "react";
import CustomTable from 'components/table';

const DetailedTable =  ({tableHead}) => {
  const tbody = () => {
    return null;
  }
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default DetailedTable;