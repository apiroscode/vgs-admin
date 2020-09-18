import React from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useCollectionDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { yupResolver } from "@hookform/resolvers";
import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";

import { maybe } from "@/utils";
import { useNotify } from "@/utils/hooks";
import { firestore } from "@/config/firebase";

import { Product, productSchema } from "@/app/products/_form";

import Images from "./Images";
import Delete from "./Delete";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "1fr",
    rowGap: theme.spacing(2) + "px",
  },
  header: {
    borderBottom: "1px solid " + theme.palette.divider,
  },
  headerAction: {
    alignSelf: "center",
    margin: 0,
  },
}));

const setValues = (product) => ({
  name: product.name,
  description: product.description,
  brand: product.brand,
  price: product.price,
  crossOutPrice: product.crossOutPrice,
  weight: product.weight,
});

const Base = ({ brands, product }) => {
  const classes = useStyles();
  const notify = useNotify();

  const {
    control,
    handleSubmit,
    errors,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: setValues(product),
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    try {
      await firestore.collection("products").doc(product.id).update(data);
      notify.success("Product successfully updated.");
      reset(data);
    } catch (e) {
      notify.error(e?.message);
    }
  };

  return (
    <div className={classes.container}>
      <Card>
        <CardHeader
          title={`Update ${product.name}`}
          className={classes.header}
          titleTypographyProps={{ variant: "h6" }}
          classes={{
            action: classes.headerAction,
          }}
          action={<Delete productId={product.id} />}
        />
        <CardContent>
          <Product
            control={control}
            errors={errors}
            brands={brands}
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
      <Images productId={product.id} images={product.images} />
    </div>
  );
};

const Update = () => {
  const { id } = useParams();
  const [product] = useDocumentData(firestore.doc(`/products/${id}`), {
    idField: "id",
  });
  const [brandsRaw] = useCollectionDataOnce(firestore.collection("brands"), {
    idField: "id",
  });
  const brands = maybe(() => brandsRaw, []);
  return product && brands.length > 0 ? (
    <Base brands={brands} product={product} />
  ) : null;
};

export default Update;
