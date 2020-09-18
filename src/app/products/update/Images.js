import React, { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

import { maybe } from "@/utils";
import { fieldValue, firestore, storage } from "@/config/firebase";

import ImageCard from "./ImageCard";

const useStyles = makeStyles((theme) => ({
  header: {
    alignItems: "center",
    borderBottom: "1px solid " + theme.palette.divider,
  },
  inputFile: { display: "none" },
  headerAction: {
    alignSelf: "center",
    margin: 0,
  },
  imageListContainer: {
    maxWidth: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(2) + "px",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },
}));

const Images = ({ productId, images: rawImages }) => {
  const [progress, setProgress] = useState(0);
  const classes = useStyles();
  const images = maybe(() => rawImages, []);

  const handleUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      const storageRef = storage.ref();
      const uploadTask = storageRef.child(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            firestore
              .collection("products")
              .doc(productId)
              .update({
                images: fieldValue.arrayUnion(downloadURL),
              });
          });
        }
      );
    }
  };

  return (
    <Card>
      <CardHeader
        title="Images"
        className={classes.header}
        titleTypographyProps={{ variant: "h6" }}
        classes={{
          action: classes.headerAction,
        }}
        action={
          progress === 0 || progress === 100 ? (
            <>
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                className={classes.inputFile}
                onChange={handleUpload}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="secondary" component="span">
                  Upload
                </Button>
              </label>
            </>
          ) : (
            <CircularProgress
              variant="static"
              size={24}
              value={progress}
              color="secondary"
            />
          )
        }
      />
      <CardContent>
        <div className={classes.imageListContainer}>
          {images.map((image) => (
            <ImageCard image={image} productId={productId} key={image} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Images;
