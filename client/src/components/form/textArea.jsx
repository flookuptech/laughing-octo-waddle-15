import React, { Fragment } from "react";
import { TextareaAutosize } from "@material-ui/core";

const CustomTextArea = ({ rows, name, onChange, placeholder, variant }) => {
  return (
    <Fragment>
      <TextareaAutosize
        rowsMin={rows}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        style={
          variant === "pending"
            ? {
                boxShadow: "inset 2px 2px 2px 0px #ddd",
                outline: "none",
                resize: "none",
                width: "100%",
                fontSize: "16px",
              }
            : {
                boxShadow: "inset 2px 2px 2px 0px #ddd",
                border: "2px solid #4065E0",
                outline: "none",
                resize: "none",
                width: "100%",
                fontSize: "16px",
              }
        }
      />
    </Fragment>
  );
};

export default CustomTextArea;
