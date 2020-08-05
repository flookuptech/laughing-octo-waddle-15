import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";
import { Typography, Box, Container, Grid, Paper, Button, TextareaAutosize } from "@material-ui/core";
import Form from 'components/form/form';
import GetAppIcon from '@material-ui/icons/GetApp';
import {readOnlyFields, editableFields} from '../15cbDetailsFields';
import { DropzoneDialog } from "material-ui-dropzone";
import InputField from "components/form/inputField";
import PublishIcon from '@material-ui/icons/Publish';
import SendIcon from '@material-ui/icons/Send';

class Details extends Form{
  state = {
    data: {}
  };

  onSubmit(){
    toast.info('Check Console');  
    console.log(this.state.data);
  }

  render(){
    return (
      <Fragment>
        <HtmlTitle title={"Add Client"} />
        <Grid>
          <ToastContainer autoClose={1500} closeButton={false} />
          <main className="content">
            <Container maxWidth="lg">
              <br />
              <Paper className="paper" elevation={4}>
                <Box className="boxBorder">
                  <Fragment>
                    <Typography className="pageHeading" component="h6" variant="h6">Downloads Available</Typography><br />
                  </Fragment>
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                   >
                       <Grid item>
                         <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<GetAppIcon />}
                          >
                           <b>Download Invoice</b>
                          </Button>
                        </Grid> 
                        <Grid item>
                         <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<GetAppIcon />}
                          >
                           <b>Download 15CB</b>
                          </Button>
                        </Grid> 
                   </Grid>
                </Box>
              </Paper><br />
              <Paper className="paper" elevation={4}>
                <Box className="boxBorder">
                    <Fragment>
                        <Typography className="pageHeading" component="h6" variant="h6">Transaction Details</Typography><br />
                    </Fragment>
                    <Grid  container spacing={3}>
                      {readOnlyFields.map(item => {
                        return (
                          <Grid item xs={6} md={4} lg={4}>
                            <InputField
                              id="standard-read-only-input"
                              // value=""
                              helperText={item.helperText}
                              InputProps={{ readOnly: true }}
                              // name={item.helperText}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                    <br />
                    <Fragment>
                        <form onSubmit={this.handleSubmit}>
                        <Grid  container spacing={3}>
                            {editableFields.map(item => {
                            return (
                                <Grid item xs={6} md={4} lg={4}>
                                <InputField
                                    required
                                    className="editable-field-background"
                                    id="standard-read-only-input"
                                    // value='asadsaasdasdd'
                                    helperText={item.helperText}
                                    InputProps={{ readOnly: false }}
                                    name={item.value}
                                    onChange={this.handleOnChange}
                                />
                                </Grid>
                            );
                            })}
                        </Grid><br />
                        <TextareaAutosize
                            rowsMin={3}
                            name="remarks"
                            onChange={this.handleOnChange}
                            placeholder="Type your remarks here, if any"
                            style={{
                            backgroundColor: "rgba(64, 101, 224, 0.1)",
                            boxShadow: "inset 2px 2px 2px 0px #ddd",
                            borderColor: '#4065E0',
                            borderWidth: 2,
                            borderRadius: "3px",
                            outline: "none",
                            resize: "none",
                            width: "100%",
                            // margin: 10,
                            fontSize: "16px"
                            }}
                        /><br /><br />
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<PublishIcon/>}
                            onClick={this.handleOpen}
                            display
                        >
                            <b>Upload 15CB</b>
                        </Button><br /><br />
                        <DropzoneDialog
                            open={this.state.data.open}
                            onSave={this.handleSave}
                            acceptedFiles={["image/*", "application/*"]}
                            showPreviews={true}
                            maxFileSize={5000000}
                            onClose={this.handleClose}
                            useChipsForPreview={true}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<SendIcon/>}
                        >
                            Submit Corrections
                        </Button> 
                        </form>
                    </Fragment>
                </Box>
              </Paper><br />
            </Container>
          </main>
        </Grid>
      </Fragment>

    );
  }
}
export default Details;