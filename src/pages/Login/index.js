import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { userLogin } from "../../actions/user";
import "./style.scss";

function Login(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isLogin && user.errorLoginMessage) {
      message.warning(user.errorLoginMessage);
    }
    if (user.isLogin && user.succesLoginMessage) {
      message.success("Login success");
    }
  }, [user]);

  const onFinish = (values) => {
    // dispatch(userLogin(values));
  };

  return (
    <Container>
      <div className="login-page mt-50">
        <Row>
          <Col xl={6}>
            <div className="login-page__img">
              <div className="login-page__img__content">
                <h2>{t("register.titleImg")}</h2>
                <p>{t("register.DescImg")}</p>
                <Link to={"/register"} className="btn btn--primary">
                  {" "}
                  {t("login.btnLogin")}
                </Link>
              </div>
            </div>
          </Col>
          <Col xl={6}>
            <div className="login-page__form">
              <h2>{t("login.title")}</h2>
              <Form
                name="formLogin"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  label={t("register.email")}
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: `${t("form.usernameRequired")}`,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={t("register.password")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: `${t("form.passwordRequired")}`,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>{t("login.rememberMe")}</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn btn--primary"
                  >
                    {t("login.submit")}
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

export default Login;
