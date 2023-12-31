import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { setUserMeta } from 'src/store';
import { loginService } from 'src/services';
import { MSG } from 'src/constants/messageCode';

const loginSchema = yup
  .object({
    email: yup.string().required('Vui lòng nhập tên sản phẩm').email(),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
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
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (!user.isLogin && user.errorLoginMessage) {
      message.warning(MSG.LOG_IN_FAILED);
    }
    if (user.isLogin && user.succesLoginMessage) {
      message.success(MSG.LOG_IN_SUCCESS);
    }
  }, [user]);

  const onSubmit = async (values) => {
    try {
      const res = await loginService(values);
      localStorage.setItem('authentication_token', res.data.data.jwt);
      dispatch(setUserMeta(res.data));
      message.success(MSG?.[res.data.message] ?? MSG.LOG_IN_SUCCESS);
      history.push('/admin/dashboard');
    } catch {
      setError('password', {
        type: 'custom',
        message: 'Sai email hoặc mật khẩu',
      });
    }
  };

  return (
    <Container>
      <div className="login-page mt-50">
        <Row>
          <Col xl={6}>
            <div className="login-page__img"></div>
          </Col>
          <Col xl={6}>
            <div className="login-page__form">
              <h2>Đăng nhập</h2>

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
                    <span style={{ color: 'red' }}>{errors.email.message}</span>
                  )}
                </Form.Item>

                <Form.Item label="Mật khẩu" required>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => <Input.Password {...field} />}
                  />
                  {errors.password && (
                    <span style={{ color: 'red' }}>
                      {errors.password.message}
                    </span>
                  )}
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button loading={isSubmitting} htmlType="submit">
                    Đăng nhập
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
