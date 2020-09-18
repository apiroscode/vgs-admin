import React from "react";

import { Link } from "react-router-dom";

import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import {
  AssignmentIndOutlined,
  ExitToAppOutlined,
  StorefrontOutlined,
} from "@material-ui/icons";

import { auth } from "@/config/firebase";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    width: "100%",
    maxWidth: theme.breakpoints.width("lg"),
    alignItems: "center",
    justifyContent: "space-between",
    margin: "auto",
  },
}));

const Headers = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <IconButton color="secondary" component={Link} to="/brands">
          <AssignmentIndOutlined />
        </IconButton>
        <IconButton color="secondary" component={Link} to="/products">
          <StorefrontOutlined />
        </IconButton>
        <IconButton color="secondary" onClick={() => auth.signOut()}>
          <ExitToAppOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Headers;
