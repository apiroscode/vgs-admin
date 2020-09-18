import React from "react";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";

import { auth } from "@/config/firebase";
import { useNotify } from "@/utils/hooks";

import { Password } from "@/components/_form";

const schemaLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(32),
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
  form: {
    display: "grid",
    rowGap: `${theme.spacing(2)}px`,
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const notify = useNotify();
  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = async (data) => {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      notify.error(error?.message);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        VGS ADMIN
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Controller
          as={TextField}
          control={control}
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Controller
          as={Password}
          control={control}
          label="Password"
          name="password"
          autoComplete="on"
          fullWidth
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          type="submit"
          color="secondary"
        >
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
