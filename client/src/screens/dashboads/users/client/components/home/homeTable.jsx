import React from "react";
import CustomTable from 'components/table';

const HomeTable =  ({tableHead}) => {
  const tbody = () => {
    return null;
  }
  return (
    <CustomTable tableHead={tableHead} tbody={tbody} />
  );
}
export default HomeTable;