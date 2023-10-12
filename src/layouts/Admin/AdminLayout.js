import { Button, Dropdown, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
// import { userLogout } from "../../actions/user";
import history from "../../untils/history";
import MenuAdmin from "./Menu";
import "./style.scss";

function AdminLayout(props) {
  const { path, component, exact } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("authentication_token");
    // dispatch(userLogout());
    history.push("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key={2}>
        <span onClick={handleLogout}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Route path={path} exact={exact}>
      <div className="layout-admin">
        <div className="layout-admin__menu">
          <div className="layout-admin__menu__img">
            <i className="far fa-smile-wink"></i>
            <span>ADMIN NS</span>
          </div>
          <MenuAdmin />
        </div>
        <div className="layout-admin__content">
          <div className="layout-admin__content__header">
            <Dropdown
              className="header__top__avatar"
              overlay={menu}
              placement="bottomCenter"
              arrow
            >
              <Button>
                <Avatar
                  src={
                    user?.avatar
                      ? user.avatar
                      : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  }
                />
                {user?.email}
              </Button>
            </Dropdown>
          </div>
          <div className="layout-admin__content__body">{component}</div>
        </div>
      </div>
    </Route>
  );
}

export default AdminLayout;
