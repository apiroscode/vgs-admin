import React from "react";
import { Outlet } from "react-router-dom";

import { FullPage } from "@/layouts";

const Auth = () => {
  return (
    <FullPage>
      <Outlet />
    </FullPage>
  );
};

export default Auth;
