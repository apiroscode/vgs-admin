import React from "react";

import { makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    minHeight: "100vh",
    placeItems: "center",
  },
}));

const BaseSpinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
};

export default BaseSpinner;
