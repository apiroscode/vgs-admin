import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { makeStyles } from "@material-ui/core";

import { firestore } from "@/config/firebase";
import { maybe } from "@/utils";

import ProductCard from "./ProductCard";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    gap: theme.spacing(2) + "px",
  },
}));

const List = () => {
  const [rawProducts] = useCollectionData(firestore.collection("products"), {
    idField: "id",
  });
  const classes = useStyles();

  const products = maybe(() => rawProducts, []);

  return products.length > 0 ? (
    <div className={classes.container}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : null;
};

export default List;
