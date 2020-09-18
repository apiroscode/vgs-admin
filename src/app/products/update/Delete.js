import React from "react";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";

import { useNotify, useOpen } from "@/utils/hooks";
import { firestore } from "@/config/firebase";

const useStyles = makeStyles((theme) => ({
  buttonError: {
    color: "#fff",
    background: theme.palette.error.main,
  },
}));

const Delete = ({ productId }) => {
  const notify = useNotify();
  const navigate = useNavigate();
  const [isOpen, onOpen, onClose] = useOpen();
  const classes = useStyles();

  const handleDelete = async () => {
    try {
      await firestore.doc(`/products/${productId}`).delete();
      notify.success("Product deleted.");
      navigate("/products");
    } catch (e) {
      notify.error(e?.message);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className={classes.buttonError}
        onClick={onOpen}
      >
        DELETE
      </Button>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Are you sure want delete this product ?</DialogTitle>
        <DialogActions>
          <Button onClick={onClose} color="primary" size="small">
            CANCEL
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            className={classes.buttonError}
            variant="contained"
            size="small"
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Delete;
