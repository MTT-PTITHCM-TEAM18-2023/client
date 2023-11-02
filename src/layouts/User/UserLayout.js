/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function UserLayout(props) {
  const { path, component, exact } = props;
  return (
    <Route path={path} exact={exact}>
      <Header />
      {component}
      <Footer />
    </Route>
  );
}

export default UserLayout;
