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
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Divider
} from "@material-ui/core";

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
        to="/dashboard/organizations"
        selected={selectedIndex === 3}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText
          primary="Create Admin"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
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
        <ListItemText
          primary="Admins List"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
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
        <ListItemText
          primary="Reports"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
      </ListItem>
      <Divider style={{ margin: "12px 0" }} />
      <ListItem
        button
        component={Link}
        to="/dashboard/account"
        selected={selectedIndex === 6}
        onClick={event => handleListItemClick(event, 6)}
      >
        <ListItemIcon>
          <Icon>
            <AccountCircleRoundedIcon />
          </Icon>
        </ListItemIcon>
        <ListItemText
          primary="Account"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
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
        <ListItemText
          primary="Home"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
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
        <ListItemText
          primary="Add Client"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
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
        <ListItemText
          primary="Clients List"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
      </ListItem>
      <Divider style={{ margin: "12px 0" }} />
      <ListItem
        button
        component={Link}
        to="/dashboard/account"
        selected={selectedIndex === 4}
        onClick={event => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <Icon>
            <AccountCircleRoundedIcon />
          </Icon>
        </ListItemIcon>
        <ListItemText
          primary="Account"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
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
        <ListItemText
          primary="Home"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
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
        <ListItemText
          primary="Upload Invoice"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
      </ListItem>
      <Divider style={{ margin: "12px 0" }} />
      <ListItem
        button
        component={Link}
        to="/dashboard/account"
        selected={selectedIndex === 3}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <Icon>
            <AccountCircleRoundedIcon />
          </Icon>
        </ListItemIcon>
        <ListItemText
          primary="Account"
          primaryTypographyProps={{ noWrap: true }}
          style={{ color: "#11fedc" }}
        />
      </ListItem>
    </List>
  );
}
