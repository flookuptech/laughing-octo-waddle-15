import React from "react";
import { TextField } from "@material-ui/core";

const Input = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type,
  autoFocus,
  required,
  size,
  helperText,
  InputProps,
  className,
  variant,
  margin
}) => {
  return (
    <div className="">
      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        autoFocus={autoFocus}
        fullWidth
        variant={variant}
        margin={margin}
        label={label}
        required={required}
        size={size}
        helperText={helperText}
        InputProps={InputProps}
        className={className}
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  variant: "outlined",
  margin: "none",
  size: "small"
};

export default Input;
