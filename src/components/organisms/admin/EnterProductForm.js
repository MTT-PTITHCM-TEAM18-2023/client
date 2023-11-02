/* eslint-disable react/prop-types */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Form, Input } from 'antd';

const enterProductSchema = yup
  .object({
    qty: yup
      .number()
      .required('Vui lòng nhập số lượng')
      .min(0, 'Số tiền tối thiểu là 0'),
    price: yup
      .number()
      .required('Vui lòng nhập số tiền')
      .min(0, 'Số tiền tối thiểu là 0'),
  })
  .required();

const EnterProductForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      qty: 0,
      price: 0,
    },
    resolver: yupResolver(enterProductSchema),
  });

  const handleSubmitForm = (formValues) => {
    onSubmit({ qty: formValues.qty });
    reset();
  };
  return (
    <div>
      <Form
        onFinish={handleSubmit(handleSubmitForm)}
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
        <Form.Item label="Số lượng nhập" required>
          <Controller
            control={control}
            name="qty"
            render={({ field }) => <Input type="number" min={0} {...field} />}
          />
          {errors.qty && (
            <span style={{ color: 'red' }}>{errors.qty.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Giá đơn nhập" required>
          <Controller
            control={control}
            name="price"
            render={({ field }) => <Input type="number" min={0} {...field} />}
          />
          {errors.name && (
            <span style={{ color: 'red' }}>{errors.price.message}</span>
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={isSubmitting} htmlType="submit">
            Nhập sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EnterProductForm;
