import React from "react";

import { Controller } from "react-hook-form";

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: theme.spacing(2) + "px",
  },
}));

const Product = (props) => {
  const {
    control,
    errors,
    brands,
    isDirty,
    isSubmitting,
    handleSubmit,
    onSubmit,
    isCreateForm,
  } = props;
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.content}>
      <Controller
        as={TextField}
        control={control}
        name="name"
        label="Name"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <FormControl variant="outlined">
        <InputLabel>Brand</InputLabel>
        <Controller
          as={
            <Select>
              {brands.map((brand) => (
                <MenuItem value={brand.id} key={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          }
          label="Brand"
          name="brand"
          control={control}
        />
      </FormControl>
      <Controller
        as={TextField}
        control={control}
        name="description"
        label="Description"
        fullWidth
        variant="outlined"
        multiline
        rows={3}
        rowsMax={5}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="price"
        label="Price"
        type="number"
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">Rp </InputAdornment>,
        }}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="crossOutPrice"
        label="Cross Out Price"
        type="number"
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">RP </InputAdornment>,
        }}
        error={!!errors.crossOutPrice}
        helperText={errors.crossOutPrice?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="weight"
        label="Weight"
        type="number"
        fullWidth
        variant="outlined"
        error={!!errors.weight}
        helperText={errors.weight?.message}
        InputProps={{
          endAdornment: <InputAdornment position="start">gr</InputAdornment>,
        }}
      />
      <Button
        disabled={!isDirty || isSubmitting}
        color="secondary"
        variant="contained"
        type="submit"
      >
        {isCreateForm ? "Create" : "Update"}
      </Button>
    </form>
  );
};

export default Product;
