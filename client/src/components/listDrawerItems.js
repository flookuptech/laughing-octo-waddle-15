import React from "react";
import { Link } from "react-router-dom";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
  Icon
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import BusinessIcon from "@material-ui/icons/Business";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";

export function ListRootDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard/"
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText
          primary="Home"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/IAM"
        selected={selectedIndex === 2}
        onClick={event => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="IAM" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/organizations"
        selected={selectedIndex === 3}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Organizations" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/tenantsList"
        selected={selectedIndex === 4}
        onClick={event => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Users List" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/Reports"
        selected={selectedIndex === 5}
        onClick={event => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </List>
  );
}

export function ListAdminDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard/"
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/addUsers"
        selected={selectedIndex === 2}
        onClick={event => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Client" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/usersList"
        selected={selectedIndex === 3}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients List" />
      </ListItem>
    </List>
  );
}

export function ListClientDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      <ListItem
        button
        component={Link}
        to="/dashboard/"
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <HomeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/uploadInvoice"
        selected={selectedIndex === 2}
        onClick={event => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <DescriptionRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Upload Invoice" />
      </ListItem>
      <Divider style={{ margin: "12px 0" }} />
      <ListItem button>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText
          primary={"Settings & account"}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </List>
  );
}
