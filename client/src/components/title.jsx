import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

const HtmlTitle = ({ title }) => {
  return (
    <Fragment>
      <Helmet>
        <title>15CACB | {title}</title>
      </Helmet>
    </Fragment>
  );
};

export default HtmlTitle;
