import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getListPaymentUser,
//   getProfileUserSuccess,
//   updateProfileUser,
// } from "../../actions/user";
import { homeURL } from "../../constants/baseURL";
import history from "../../untils/history";
import ListOrdered from "./ListOrdered";
import "./style.scss";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};
function Profile(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const token = JSON.parse(localStorage.getItem("authentication_token"));
  useEffect(() => {
    if (!token) {
      history.push(homeURL);
    }
    form.setFieldsValue({
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      fullName: user?.fullName,
      avatar: user?.avatar,
    });
    // dispatch(getListPaymentUser(user.id));
    if (!user.isUpdated && user.errorUpdateProfileMessage) {
      message.warning(user.errorUpdateProfileMessage);
    }
    if (user.isUpdated && user.messageUpdateSuccess) {
      message.success("Update success");
      // dispatch(getProfileUserSuccess({ messageUpdateSuccess: "" }));
    }
  }, [dispatch, form, user, token]);

  const onFinish = (values) => {
    // dispatch(updateProfileUser({ data: values, idUser: user.id }));
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="profile-page mt-50">
      <Container>
        <Row>
          <Col xl={4} sm={12}>
            <div className="profile-page__img">
              <img
                src={
                  user?.avatar
                    ? user.avatar
                    : "https://wallpaperaccess.com/full/114760.jpg"
                }
                alt="imgPerson"
              />
            </div>
          </Col>
          <Col xl={8} sm={12}>
            <div className="profile-page__info">
              <h2 className="text-center">{t("profilePage.title")}</h2>
              <Form
                {...formItemLayout}
                form={form}
                name="updateProfile"
                onFinish={onFinish}
                initialValues={{
                  prefix: "84",
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="email"
                  label={t("register.email")}
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                  value={user.email}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={t("register.password")}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 6,
                      message: "Password should greater than 6!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="fullName" label={t("register.fullName")}>
                  <Input />
                </Form.Item>
                <Form.Item name="avatar" label={t("register.avatar")}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={t("register.phone")}
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      len: 9,
                      message: "Please input your phone number exact 9 number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  label={t("register.address")}
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label={t("register.gender")}
                  rules={[
                    {
                      required: true,
                      message: "Please select gender!",
                    },
                  ]}
                >
                  <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn btn--primary"
                  >
                    {t("register.update")}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <div className="profile-page__list-ordered mt-50">
              <h2>{t("profilePage.listOrder")}</h2>
              <ListOrdered />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
