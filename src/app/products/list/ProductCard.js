import React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { firestore } from "@/config/firebase";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    cursor: "pointer",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2) + "px !important",
  },
  media: { height: 0, paddingTop: "75%" },
}));

const Brand = ({ brandId }) => {
  const [brand] = useDocumentDataOnce(firestore.doc(`/brands/${brandId}`));

  return (
    <Typography variant="body2" color="textSecondary">
      {brand ? brand.name : null}
    </Typography>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const image = product?.images
    ? product.images[0]
    : "https://via.placeholder.com/200x200";

  return (
    <Card
      className={classes.container}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardMedia image={image} title="" className={classes.media} />
      <CardContent className={classes.infoContainer}>
        <Brand brandId={product.brand} />
        <Typography gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography variant="h6" color="secondary">
          $ {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
