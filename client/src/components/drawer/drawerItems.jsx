import React from "react";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import HomeIcon from "@material-ui/icons/Home";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import BusinessIcon from "@material-ui/icons/Business";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  makeStyles,
  Typography
} from "@material-ui/core";


const styles = makeStyles({
  listItemActive: {
    backgroundColor: 'rgba(0,0,128,0.8) !important',
    borderLeft: '7px solid #11fedc',
  },
  listItemInActive: {
    backgroundColor: '#4065e0'
  },
  activeIcon: {
    color: '#11fedc'
  },
  inActiveIcon: {
    color: '#11fedc',
    opacity: 0.6
  },
  activeText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bolder'
  },
  inActiveText: {
    color: 'white',
    opacity: 0.6,
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export function ListRootDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const classes = styles();

  return (
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard/"
        selected={selectedIndex === 1}
        className={selectedIndex == 1 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <HomeIcon className={selectedIndex == 1 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 1 ? classes.activeText : classes.inActiveText}>HOME</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/organizations"
        selected={selectedIndex === 2}
        className={selectedIndex == 2 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <PeopleIcon className={selectedIndex == 2 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 2 ? classes.activeText : classes.inActiveText}>CREATE ADMIN</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/tenantsList"
        selected={selectedIndex === 3}
        className={selectedIndex == 3 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <BusinessIcon className={selectedIndex == 3 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 3 ? classes.activeText : classes.inActiveText}>ADMIN LIST</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/Reports"
        selected={selectedIndex === 4}
        className={selectedIndex == 4 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <BarChartIcon className={selectedIndex == 4 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 4 ? classes.activeText : classes.inActiveText}>REPORTS</Typography>
        </ListItemText>
      </ListItem>
      <Divider style={{ margin: "12px 0" }} />
      <ListItem
        button
        component={Link}
        to="/dashboard/account"
        onClick={event => handleListItemClick(event, 5)}
        selected={selectedIndex === 5}
        className={selectedIndex == 5 ? classes.listItemActive: classes.listItemInActive}
      >
        <ListItemIcon>
          <AccountCircleRoundedIcon className={selectedIndex == 5 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 5 ? classes.activeText : classes.inActiveText}>ACCOUNT</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export function ListAdminDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const classes = styles();

  return (
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard/"
        selected={selectedIndex === 1}
        className={selectedIndex == 1 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <HomeIcon className={selectedIndex == 1 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 1 ? classes.activeText : classes.inActiveText}>HOME</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/addUsers"
        selected={selectedIndex === 2}
        className={selectedIndex == 2 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <PersonAddIcon className={selectedIndex == 2 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 2 ? classes.activeText : classes.inActiveText}>ADD CLIENT</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/usersList"
        selected={selectedIndex === 3}
        className={selectedIndex == 3 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <PeopleIcon className={selectedIndex == 3 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 3 ? classes.activeText : classes.inActiveText}>CLIENT LIST</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/completed15CB"
        selected={selectedIndex === 4}
        className={selectedIndex == 4 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <AssignmentTurnedInIcon className={selectedIndex == 4 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 4 ? classes.activeText : classes.inActiveText}>COMPLETED 15CB</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/pending15CB"
        selected={selectedIndex === 5}
        className={selectedIndex == 5 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <ScheduleIcon className={selectedIndex == 5 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 5 ? classes.activeText : classes.inActiveText}>PENDING 15CB</Typography>
        </ListItemText>
      </ListItem>
      <Divider style={{ margin: "12px 0" }} />
      <ListItem
        button
        component={Link}
        to="/dashboard/account"
        selected={selectedIndex === 6}
        className={selectedIndex == 6 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 6)}
      >
        <ListItemIcon>
          <AccountCircleRoundedIcon className={selectedIndex == 6 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 6 ? classes.activeText : classes.inActiveText}>ACCOUNT</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export function ListClientDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const classes = styles();  

  return (
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard/"
        selected={selectedIndex === 1}
        className={selectedIndex == 1 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <HomeRoundedIcon className={selectedIndex == 1 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 1 ? classes.activeText : classes.inActiveText}>HOME</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/uploadInvoice"
        selected={selectedIndex === 2}
        className={selectedIndex == 2 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <DescriptionRoundedIcon className={selectedIndex == 2 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 2 ? classes.activeText : classes.inActiveText}>UPLOAD INVOICE</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/completed15CB"
        selected={selectedIndex === 3}
        className={selectedIndex == 3 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <AssignmentTurnedInIcon className={selectedIndex == 3 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 3 ? classes.activeText : classes.inActiveText}>COMPLETED 15CB</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/pending15CB"
        selected={selectedIndex === 4}
        className={selectedIndex == 4 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <ScheduleIcon className={selectedIndex == 4 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 4 ? classes.activeText : classes.inActiveText}>PENDING 15CB</Typography>
        </ListItemText>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/reports"
        selected={selectedIndex === 5}
        className={selectedIndex == 5 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <BarChartIcon className={selectedIndex == 5 ? classes.activeIcon : classes.inActiveIcon} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 5 ? classes.activeText : classes.inActiveText}>REPORTS</Typography>
        </ListItemText>
      </ListItem>
      <Divider style={{ margin: "12px 0" }} />
      <ListItem
        button
        component={Link}
        to="/dashboard/account"
        selected={selectedIndex === 6}
        className={selectedIndex == 6 ? classes.listItemActive: classes.listItemInActive}
        onClick={event => handleListItemClick(event, 6)}
      >
        <ListItemIcon>
          <AccountCircleRoundedIcon className={selectedIndex == 6 ? classes.activeIcon : classes.inActiveIcon}/>
        </ListItemIcon>
        <ListItemText>
          <Typography className={selectedIndex == 6 ? classes.activeText : classes.inActiveText}>ACCOUNT</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}
