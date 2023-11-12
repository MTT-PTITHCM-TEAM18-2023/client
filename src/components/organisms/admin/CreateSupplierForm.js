/* eslint-disable react/prop-types */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Form, Input } from 'antd';

const regexPhoneNumber = /^(0[0-9]{9,10})$/;

const createCategorySchema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên nhà cung cấp'),
    phone: yup
      .string()
      .test('phone', 'Số điện thoại không hợp lệ', (value) =>
        regexPhoneNumber.test(value)
      )
      .required('Vui lòng nhập SĐT'),
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
  })
  .required();

const CreateSupplierForm = ({ obSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
    resolver: yupResolver(createCategorySchema),
  });

  const handleFinish = (formValues) => {
    handleSubmit(obSubmit)(formValues);
  };
  return (
    <div>
      <Form
        onFinish={handleFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Tên nhà cung cấp"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên nhà cung cấp',
            },
          ]}
          required
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && (
            <span style={{ color: 'red' }}>
              {errors?.name?.message ?? 'Vui lòng nhập tên NCC'}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Số điện thoại" required>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => <Input {...field} />}
          />
          {errors.phone && (
            <span style={{ color: 'red' }}>
              {errors?.phone?.message ?? 'Vui lòng nhập số điện thoại'}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Email" required>
          <Controller
            control={control}
            name="email"
            render={({ field }) => <Input {...field} />}
          />
          {errors.email && (
            <span style={{ color: 'red' }}>
              {errors?.email?.message ?? 'Vui lòng nhập email'}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Địa chỉ" required>
          <Controller
            control={control}
            name="address"
            render={({ field }) => <Input {...field} />}
          />
          {errors.address && (
            <span style={{ color: 'red' }}>
              {errors?.address?.message ?? 'Vui lòng nhập địa chỉ'}
            </span>
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={isSubmitting} htmlType="submit">
            Tạo nhà cung cấp
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateSupplierForm;
