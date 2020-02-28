import React from "react";
import {
  makeStyles,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export function SelectFieldRole({ onChange, role, hasError }) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const classes = useStyles();

  return (
    <div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
        fullWidth
        required
      >
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Role
        </InputLabel>
        <Select
          onChange={onChange}
          name="role"
          labelWidth={labelWidth}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {role.map(item => {
            return <MenuItem value={item.role}>{item.label}</MenuItem>;
          })}
        </Select>
        {hasError && <FormHelperText>This is required!</FormHelperText>}
      </FormControl>
    </div>
  );
}
