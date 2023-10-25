import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import { setUserMeta } from "src/store";
import { loginService } from "src/apis";
import { toast } from "react-toastify";

const loginSchema = yup
  .object({
    email: yup.string().required("Vui lòng nhập tên sản phẩm").email(),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  })
  .required();

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (!user.isLogin && user.errorLoginMessage) {
      message.warning(user.errorLoginMessage);
    }
    if (user.isLogin && user.succesLoginMessage) {
      message.success("Login success");
    }
  }, [user]);

  const onSubmit = async (values) => {
    const res = await loginService(values);
    console.log("res", res);
    localStorage.setItem("authentication_token", res.data.data.jwt);
    dispatch(setUserMeta(res.data));
    toast.success(res.data.message);
    history.push("/admin/dashboard");
  };

  return (
    <Container>
      <div className="login-page mt-50">
        <Row>
          <Col xl={6}>
            <div className="login-page__img">
              <div className="login-page__img__content">
                <h2>Chưa có tài khoản?</h2>
                <Link to={"/register"} className="btn btn--primary">
                  {" "}
                  Đăng ký
                </Link>
              </div>
            </div>
          </Col>
          <Col xl={6}>
            <div className="login-page__form">
              <h2>Đăng nhập</h2>
              {/* <Form
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
              </Form> */}

              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <Form.Item label="Email" required>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}
                </Form.Item>

                <Form.Item label="Password" required>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => <Input.Password {...field} />}
                  />
                  {errors.password && (
                    <span style={{ color: "red" }}>
                      {errors.password.message}
                    </span>
                  )}
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button loading={isSubmitting} htmlType="submit">
                    Submit
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
