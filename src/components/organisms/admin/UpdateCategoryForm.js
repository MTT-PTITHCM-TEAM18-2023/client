/* eslint-disable react/prop-types */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Form, Input } from 'antd';

const createCategorySchema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên danh mục'),
  })
  .required();

const UpdateCategoryForm = ({ obSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
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
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên sản phẩm',
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
              {errors?.name?.message ?? 'Vui lòng nhập tên danh mục'}
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
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCategoryForm;
