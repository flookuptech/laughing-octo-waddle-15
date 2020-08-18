import { Component } from "react";

class Form extends Component {
  state = {
    data: {
      open: false,
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.onSubmit();
  };

  overrideHandleSubmit = (e) => {
    e.preventDefault();
    this.overrideOnSubmit();
  };

  handleOnChange = ({ target }) => {
    const data = { ...this.state.data };
    data[target.name] = target.value;
    this.setState({ data });
  };

  handleClose = () => {
    const data = { ...this.state.data };
    data.open = false;
    this.setState({
      data,
    });
  };

  handleSave = (files) => {
    const data = { ...this.state.data };
    data.files = files;
    data.open = false;
    this.setState({
      data,
    });
  };

  handleOpen = () => {
    const data = { ...this.state.data };
    data.open = true;
    this.setState({
      data,
    });
  };

  render() {
    return null;
  }
}

export default Form;
