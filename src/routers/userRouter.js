import React from 'react';

import HomePage from 'src/pages/Home';
import ProductsPage from 'src/pages/Products';
import DetailProduct from 'src/pages/DetailProduct';
import Register from 'src/pages/Register';
import Cart from 'src/pages/Cart';
import Profile from 'src/pages/Profile';
import {
  cartURL,
  homeURL,
  productDetailURL,
  productsURL,
  profileURL,
  registerURL,
} from 'src/constants/baseURL';

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
