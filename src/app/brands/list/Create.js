import React, { useState } from "react";

import { Button, makeStyles, Paper, TextField } from "@material-ui/core";

import { firestore } from "@/config/firebase";
import { useNotify } from "@/utils/hooks";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    alignItems: "center",
    gridTemplateRows: "auto auto",
    [theme.breakpoints.up("md")]: {
      gridTemplateRows: "auto",
      gridTemplateColumns: "1fr auto",
    },
    gap: theme.spacing(2) + "px",
    padding: theme.spacing(2),
  },
  button: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(20),
    },
  },
}));

const Create = () => {
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const notify = useNotify();

  const createBrand = async () => {
    setLoading(true);
    if (!brand) {
      return;
    }
    setBrand("");
    try {
      await firestore.collection("brands").add({ name: brand });
      notify.success("Brand added.");
    } catch (e) {
      notify.error(e.message);
    }
    setLoading(false);
  };

  return (
    <Paper className={classes.container}>
      <TextField
        variant="outlined"
        label="New Brand"
        fullWidth
        value={brand}
        size="small"
        onChange={(e) => setBrand(e.target.value)}
      />
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        disabled={loading}
        onClick={createBrand}
        size="small"
      >
        CREATE
      </Button>
    </Paper>
  );
};

export default Create;
