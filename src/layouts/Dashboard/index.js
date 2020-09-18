import React from "react";

import { Outlet } from "react-router-dom";

import { makeStyles } from "@material-ui/core";

import Headers from "./Headers";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    minHeight: "100vh",
  },
  container: {
    width: theme.breakpoints.width("lg"),
    maxWidth: "100vw",
    margin: "0 auto",
  },
  main: {
    margin: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Headers />
      <div className={classes.container}>
        <main className={classes.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
