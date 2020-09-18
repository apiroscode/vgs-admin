import React, { useContext } from "react";

import { Navigate, Route as ReactRoute } from "react-router-dom";

import { AuthContext } from "@/config/auth";

const Route = (props) => {
  const { auth, isPrivate, ...rest } = props;
  const { currentUser } = useContext(AuthContext);

  if (auth) {
    let checker, redirectPath;
    if (isPrivate) {
      checker = !!currentUser;
      redirectPath = "/login";
    } else {
      checker = !currentUser;
      redirectPath = "/";
    }

    if (checker) {
      return <ReactRoute {...rest} />;
    } else {
      return <Navigate to={redirectPath} />;
    }
  }
  return <ReactRoute {...rest} />;
};

export default Route;
