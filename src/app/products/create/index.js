import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

import { yupResolver } from "@hookform/resolvers";
import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";

import { maybe } from "@/utils";
import { useNotify } from "@/utils/hooks";
import { firestore } from "@/config/firebase";

import { Product, productSchema } from "@/app/products/_form";

const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: "1px solid " + theme.palette.divider,
  },
}));

const Base = ({ brands }) => {
  const classes = useStyles();
  const notify = useNotify();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    errors,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      price: 0.0,
      crossOutPrice: 0.0,
      weight: 0,
    },
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await firestore.collection("products").add(data);
      notify.success("Product successfully created.");
      navigate(`/products/${result.id}`);
    } catch (e) {
      notify.error(e?.message);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Create a new product"
        className={classes.header}
        titleTypographyProps={{ variant: "h6" }}
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
          isCreateForm
        />
      </CardContent>
    </Card>
  );
};

const Create = () => {
  const [brandsRaw] = useCollectionDataOnce(firestore.collection("brands"), {
    idField: "id",
  });
  const brands = maybe(() => brandsRaw, []);

  return brands.length > 0 ? <Base brands={brands} /> : null;
};

export default Create;
