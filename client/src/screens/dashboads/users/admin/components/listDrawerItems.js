import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PageviewIcon from "@material-ui/icons/Pageview";
import HelpIcon from "@material-ui/icons/Help";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CropFreeIcon from "@material-ui/icons/CropFree";

import { Link } from "react-router-dom";

export default function ListDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
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
    </div>
  );
}
