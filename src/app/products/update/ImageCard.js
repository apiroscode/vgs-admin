import React from "react";

import { IconButton, makeStyles } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";

import { fieldValue, firestore } from "@/config/firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.palette.divider}`,
  },
  image: ({ image }) => ({
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "0",
    paddingBottom: "100%",
  }),
  buttonContainer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

const ImageCard = ({ productId, image }) => {
  const classes = useStyles({
    image: image,
  });

  const handleDelete = () => {
    firestore
      .collection("products")
      .doc(productId)
      .update({
        images: fieldValue.arrayRemove(image),
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.image} />
      <div className={classes.buttonContainer}>
        <IconButton className={classes.deleteButton} onClick={handleDelete}>
          <DeleteOutlined />
        </IconButton>
      </div>
    </div>
  );
};

export default ImageCard;
