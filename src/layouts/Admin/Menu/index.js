/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  adminHomeURL,
  adminProductURL,
  adminUserURL,
} from '../../../constants/baseURL';
import './style.scss';
function MenuAdmin() {
  let menus = [
    {
      to: adminHomeURL,
      label: 'Home',
      exact: true,
      icon: <i className="fas fa-home"></i>,
    },
    {
      to: adminProductURL,
      label: 'Products',
      exact: false,
      icon: <i className="fas fa-align-left"></i>,
    },
    {
      to: adminUserURL,
      label: 'Users',
      exact: false,
      icon: <i className="fas fa-user-friends"></i>,
    },
  ];

  let result = menus.map((menu, index) => {
    return (
      <MenuLink
        key={index}
        label={menu.label}
        icon={menu.icon}
        to={menu.to}
        activeOnlyWhenExact={menu.exact}
      />
    );
  });
  return (
    <div className="navigation-admin">
      <ul className="navigation-admin__list">{result}</ul>
    </div>
  );
}
let MenuLink = ({ label, to, activeOnlyWhenExact, icon }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <li className="navigation-admin__item">
      <Link
        to={to}
        className={
          match
            ? 'navigation-admin__active navigation-admin__link'
            : 'navigation-admin__link'
        }
      >
        {icon}
        {label}
      </Link>
    </li>
  );
};

export default MenuAdmin;
