import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Select, Form, Input, Upload, message } from "antd";

import { getSupplier, fetchCategory } from "src/apis";
import { parseBase64 } from "src/common/utils/parseBase64";
import { toast } from "react-toastify";

const createProductSchema = yup
  .object({
    name: yup.string().required("Vui lòng nhập tên sản phẩm"),
    description: yup.string(),
    price: yup
      .number()
      .required("Vui lòng nhập số tiền")
      .min(0, "Số tiền tối thiểu là 0"),
    unit: yup.string().required("Vui lòng nhập đơn vị"),
    categoryId: yup.string().required("Vui lòng chọn danh mục"),
    supplierId: yup.string().required("Vui lòng chọn nhà cung cấp"),
    image: yup.mixed().required("Vui lòng chọn ảnh"),
  })
  .required();

const CreateProductForm = ({ onSubmit }) => {
  const [suppliers, serSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      unit: "",
      categoryId: "",
      supplierId: "",
      image: null,
    },
    resolver: yupResolver(createProductSchema),
  });

  useEffect(() => {
    (async () => {
      const resSupliers = await getSupplier({ page: 1, limit: 30 });
      serSuppliers(resSupliers?.data?.items ?? []);
      const resCategory = await fetchCategory({ limit: 30 });
      setCategories(resCategory?.data?.data?.items);
    })();
  }, []);

  const handleSupplyChange = (value) => {
    setValue("supplierId", value); // Update the value of the 'category' field
  };

  const handleCategoryChange = (value) => {
    setValue("categoryId", value); // Update the value of the 'category' field
  };

  const handleChangeImage = async (file) => {
    const fsize = file?.size;
    if (fsize && fsize / 1024 >= 4096) {
      message.error("Fize size too big");
      return true;
    }
    const url = await parseBase64(file);
    setImageUrl(url);
    return false;
  };
  const handleSubmitForm = (formValues) => {
    const { image, ...data } = formValues;
    console.log("formValues", formValues);
    onSubmit({ ...data, imageUrl });
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
        <Form.Item
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm",
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
            <span style={{ color: "red" }}>
              {errors?.name?.message ?? "Vui lòng nhập tên sản phẩm"}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Mô tả sản phẩm">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Input.TextArea
                {...field}
                maxLength={500}
                style={{ height: 120, resize: "none" }}
              />
            )}
          />
          {errors.description && (
            <span style={{ color: "red" }}>
              {errors?.description?.message ?? "Vui lòng nhập mô tả"}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Giá sản phẩm" required>
          <Controller
            control={control}
            name="price"
            render={({ field }) => <Input type="number" min={0} {...field} />}
          />
          {errors.name && (
            <span style={{ color: "red" }}>
              {errors?.price?.message ?? "Vui lòng nhập giá"}
            </span>
          )}
        </Form.Item>

        <Form.Item
          label="Đơn vị sản phẩm"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Đơn vị sản phẩm",
            },
          ]}
          required
        >
          <Controller
            control={control}
            name="unit"
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && (
            <span style={{ color: "red" }}>
              {errors?.unit?.message ?? "Vui lòng nhập đơn vị"}
            </span>
          )}
        </Form.Item>

        <Form.Item
          label="Danh mục"
          // name="categoryId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Danh mục",
            },
          ]}
          required
        >
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select {...field} onChange={handleCategoryChange}>
                {categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          {errors.categoryId && (
            <span style={{ color: "red" }}>
              {errors?.categoryId?.message ?? "Vui lòng chọn Danh mục"}
            </span>
          )}
        </Form.Item>

        <Form.Item
          label="Nhà cung cấp"
          // name="supplierId"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Nhà sản xuất",
            },
          ]}
        >
          <Controller
            control={control}
            name="supplierId"
            render={({ field }) => (
              <Select {...field} onChange={handleSupplyChange}>
                {suppliers.map((supply) => (
                  <Select.Option value={supply.id} key={supply.id}>
                    {supply.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          {errors.supplierId && (
            <span style={{ color: "red" }}>
              {errors?.supplierId?.message ?? "Vui lòng chọn Nhà sản xuất"}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <Upload
                {...field}
                accept="image/*"
                beforeUpload={handleChangeImage}
                maxCount={1}
              >
                <Button htmlType="button">Chọn ảnh</Button>
              </Upload>
            )}
          />
          {errors.image && (
            <span style={{ color: "red" }}>
              {errors?.image?.message ?? "Vui lòng nhập ảnh sản phẩm"}
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
            Taọ sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProductForm;
