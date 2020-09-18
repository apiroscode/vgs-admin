import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  makeStyles,
  TableCell,
  TextField,
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";

import { firestore } from "@/config/firebase";
import { useNotify, useOpen } from "@/utils/hooks";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    marginLeft: "auto",
    display: "grid",
    gap: theme.spacing(1) + "px",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyItems: "center",
    paddingLeft: theme.spacing(2),
  },
  buttonError: {
    color: theme.palette.error.main,
  },
}));

const Update = ({ brand }) => {
  const { id, name } = brand;
  const [val, setVal] = useState(name);
  const notify = useNotify();
  const classes = useStyles();
  const [isOpen, onOpen, onClose] = useOpen();

  useEffect(() => {
    setVal(name);
  }, [name]);

  const handleUpdate = async () => {
    if (val === name) {
      return;
    }
    try {
      await firestore.doc(`/brands/${id}`).update({
        name: val,
      });
      notify.success("Brand name updated");
    } catch (e) {
      notify.error(e?.message);
    }
  };

  const handleDelete = async () => {
    try {
      onClose();
      await firestore.doc(`/brands/${id}`).delete();
      notify.success("Brand deleted");
    } catch (e) {
      notify.error(e?.message);
    }
  };

  return (
    <TableCell className={classes.container}>
      <TextField
        value={val}
        onChange={(e) => setVal(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
      />
      <div className={classes.buttonContainer}>
        <IconButton
          size="small"
          color="secondary"
          onClick={handleUpdate}
          disabled={name === val}
        >
          <EditOutlined />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton
          size="small"
          color="secondary"
          className={classes.buttonError}
          onClick={onOpen}
        >
          <DeleteOutlined />
        </IconButton>
        <Dialog open={isOpen} onClose={onClose}>
          <DialogTitle>Are you sure want delete this brand ?</DialogTitle>
          <DialogActions>
            <Button onClick={onClose} color="primary" size="small">
              CANCEL
            </Button>
            <Button
              onClick={handleDelete}
              autoFocus
              className={classes.buttonError}
              variant="outlined"
              size="small"
            >
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </TableCell>
  );
};

export default Update;
