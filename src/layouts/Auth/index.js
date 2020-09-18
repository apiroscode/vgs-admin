import React from "react";
import { Outlet } from "react-router-dom";

import { Card, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    minHeight: "100vh",
    backgroundColor: theme.palette.primary.main,
    placeItems: "center",
  },
  card: {
    padding: theme.spacing(2),
  },
}));

const Auth = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Outlet />
      </Card>
    </div>
  );
};

export default Auth;
