import React from "react";

import { Link } from "react-router-dom";

import { makeStyles, Button } from "@material-ui/core";

import List from "./List";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gap: theme.spacing(2) + "px",
    gridTemplateRows: "auto 1fr",
  },
}));

const ProductList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button
        color="secondary"
        variant="contained"
        component={Link}
        to="create"
      >
        Create Product
      </Button>
      <List />
    </div>
  );
};

export default ProductList;
