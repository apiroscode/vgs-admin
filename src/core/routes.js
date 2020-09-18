import React, { lazy, Suspense } from "react";
import { Navigate, Routes as ReactRoutes } from "react-router-dom";

import { BaseSpinner } from "@/components";

import { Route } from "./components";

const Auth = lazy(() => import("@/layouts/Auth"));
const Dashboard = lazy(() => import("@/layouts/Dashboard"));

const BrandList = lazy(() => import("@/app/brands/list"));
const ProductList = lazy(() => import("@/app/products/list"));
const ProductCreate = lazy(() => import("@/app/products/create"));
const ProductUpdate = lazy(() => import("@/app/products/update"));
const SignIn = lazy(() => import("@/app/auth/signIn"));

export const Routes = () => (
  <Suspense fallback={<BaseSpinner />}>
    <ReactRoutes>
      <Route path="/*" element={<Dashboard />} auth isPrivate>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/:id" element={<ProductUpdate />} />
        <Route path="/brands" element={<BrandList />} />
        <Route path="/*" element={<Navigate to="/products" />} />
      </Route>
      <Route path="login/*" element={<Auth />} auth>
        <Route path="/" element={<SignIn />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Route>
    </ReactRoutes>
  </Suspense>
);
