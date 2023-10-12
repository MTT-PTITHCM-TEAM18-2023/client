import React from "react";

// const HomePage = React.lazy(() => import("./../pages/Home"));
import HomePage from "./../pages/Home";
import ProductsPage from "./../pages/Products";
import DetailProduct from "./../pages/DetailProduct";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Cart from "./../pages/Cart";
import Profile from "../pages/Profile";
import {
  cartURL,
  homeURL,
  loginURL,
  productDetailURL,
  productsURL,
  profileURL,
  registerURL,
} from "../constants/baseURL";

const routers = [
  {
    path: homeURL,
    exact: true,
    main: <HomePage />,
  },
  {
    path: productsURL,
    exact: true,
    main: <ProductsPage />,
  },
  {
    path: productDetailURL,
    exact: true,
    main: <DetailProduct />,
  },
  {
    path: loginURL,
    exact: true,
    main: <Login />,
  },
  {
    path: registerURL,
    exact: true,
    main: <Register />,
  },
  {
    path: cartURL,
    exact: true,
    main: <Cart />,
  },
  {
    path: profileURL,
    exact: true,
    main: <Profile />,
  },
];

export default routers;
