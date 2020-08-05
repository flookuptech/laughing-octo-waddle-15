// import React, { Component, Fragment } from 'react';
// import {
//     Typography,
//     Container,
//     Box,
//     withStyles,
//     Grid,
//     Paper
//   } from "@material-ui/core";
// import "react-toastify/dist/ReactToastify.css";
// import SummaryTable from './summaryTable';
// import DetailedTable from './detailedTable';
// import { clientCompletedSummaryTableHead, clientCompletedDetailedTableHead } from 'components/tableHead'; 
// import HtmlTitle from "components/title";

// const styles = {
//   pageHeading: {
//     fontWeight: 'bold'
//   },
//   boxBorder: {
//     border: "1px solid rgba(0, 0, 0, 0.2)",
//     borderRadius: "10px",
//     opacity: "1",
//     padding: "15px"
//   },
//   content: {
//     flexGrow: 1,
//     height: "auto",
//     overflow: "none",
//     maxWidth: '75vw'
//   },
//   paper:{
//     display: 'flex',
//     flexDirection: "column",
//     padding: 32
//   }
// };

// class Completed15cb extends Component {
//     render(){
//         const { classes } = this.props;
//         return(
//           <Fragment>
//             <HtmlTitle title={"Completed 15CB"} />
//             <Grid>
//               <main className={classes.content}>
//                 <Container maxWidth="lg">
//                   <br />
//                   <Paper className={classes.paper} elevation={4}>
//                     <Box className={classes.boxBorder}>
//                       <div>
//                         <Typography className={classes.pageHeading} component="h5" variant="h5">
//                           Completed 15CB
//                         </Typography>
//                       </div><br />
//                       <div>
//                         <SummaryTable tableHead={ clientCompletedSummaryTableHead } /><br /><br />
//                         <DetailedTable tableHead={ clientCompletedDetailedTableHead } />
//                       </div>
//                       <br />
//                     </Box>
//                   </Paper><br />
//                 </Container>
//               </main>
//             </Grid>
//           </Fragment>
//         );
//     }
// }

// export default withStyles(styles)(Completed15cb);
import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
  text: {
    color: 'blue',
    fontWeight: "bold",
    backgroundColor: '#11fedc',
    opacity: 0.5
  }
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        className={classes.text}
        indicatorColor="primary"
        // textColor={colorText}  
        aria-label="icon label tabs example"
      >
        <Tab icon={<PhoneIcon />} label="Summary">
          <div>
            <Typography>Helllppp</Typography>
          </div>
        </Tab>
        {/* <Tab icon={<FavoriteIcon />} label="Detailed" /> */}
      </Tabs>
    </Paper>
  );
}
