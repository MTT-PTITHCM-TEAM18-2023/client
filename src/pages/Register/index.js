import { Button, Checkbox, Form, Input, message, Select } from "antd";
import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { userRegister } from "../../actions/user";
import "./style.scss";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
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
      offset: 8,
    },
  },
};

function Register(props) {
  // const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isRegister && user.errorRegisterMessage) {
      message.warning(user.errorRegisterMessage);
    }
    user.isRegister && message.success("Register success");
  }, [user]);

  const onFinish = (values) => {
    // dispatch(userRegister(values));
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
    <Container>
      <div className="register-page mt-50">
        <Row>
          <Col xl={6}>
            <div className="login-page__img">
              <div className="login-page__img__content">
                <h2>{t("register.titleImg")}</h2>
                <p>{t("register.DescImg")}</p>
                <Link to={"/login"} className="btn btn--primary">
                  {" "}
                  {t("register.loginBtn")}
                </Link>
              </div>
            </div>
          </Col>
          <Col xl={6}>
            <div className="login-page__form">
              <h2>{t("register.title")}</h2>
              <Form
                {...formItemLayout}
                form={form}
                name="register"
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
                >
                  <Input />
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

                <Form.Item
                  name="confirm"
                  label={t("register.confirmPassword")}
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
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

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>
                    {t("register.agreement1")}{" "}
                    <a href="#1">{t("register.agreement2")}</a>
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn btn--primary"
                  >
                    {t("register.register")}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Register;
