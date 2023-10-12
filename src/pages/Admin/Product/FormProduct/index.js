import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
const CheckboxGroup = Checkbox.Group
const { Option } = Select

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
}
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
}
const color = ["red", "black", "white", "gray"]
const sizes = ["38", "39", "49", "41", "42"]

function FormProduct(props) {
  const { data, onCloseModal } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)

  useEffect(() => {
    if (data?.key) {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        discount: data.discount,
        image1: data.image[0],
        image2: data.image[1],
        image3: data.image[2],
        image4: data.image[3],
        color: data.color,
        size: data.size.map((item) => item + ""),
      })
    } else {
      form.resetFields()
    }
    if (
      products.isAddProductSuccess &&
      products.messageAddProduct === "success"
    ) {
      message.success("Add product success")
      onCloseModal()
      form.resetFields()
      // dispatch(cleareMessageProduct())
    }
    if (
      !products.isAddProductSuccess &&
      products.messageAddProduct === "error"
    ) {
      message.error("Add product error")
      // dispatch(cleareMessageProduct());
    }
    if (
      products.isUpdateProductSuccess &&
      products.messageUpdateProduct === "success"
    ) {
      message.success("Update product success")
      onCloseModal()
      form.resetFields()
      // dispatch(cleareMessageProduct());
    }
    if (
      !products.isUpdateProductSuccess &&
      products.messageUpdateProduct === "error"
    ) {
      message.error("Add product error")
      // dispatch(cleareMessageProduct())
    }
  }, [dispatch, products, onCloseModal, form, data])

  const onFinish = (values) => {
    const sendData = {
      categoryId: values.categoryId,
      color: values.color,
      description: values.description,
      discount: values.discount,
      link_img: [values.image1, values.image2, values.image3, values.image4],
      name: values.name,
      price: values.price,
      size: values.size.map((item) => +item),
    }
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name={data?.key ? "UpdateProduct" : "AddProduct"}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row>
        <Col xl={12}>
          <Form.Item
            name="name"
            label="Name product"
            rules={[
              {
                required: true,
                message: "Please input name product!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[
              {
                required: true,
                message: "Please select category!",
              },
            ]}
          >
            <Select placeholder="select your category">
              <Option value={1}>GIÀY THỜI TRANG</Option>
              <Option value={2}>GIÀY NIKE</Option>
              <Option value={3}>GIÀY ADIDAS</Option>
              <Option value={4}>GIÀY VANS</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input description",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input price",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount"
            rules={[
              {
                required: true,
                message: "Please input discount",
              },
            ]}
          >
            <InputNumber min={1} max={100} />
          </Form.Item>
        </Col>
        <Col xl={12}>
          <Form.Item
            name="image1"
            label="Image 1"
            rules={[
              {
                required: true,
                message: "Please input image 1!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image2"
            label="Image 2"
            rules={[
              {
                required: true,
                message: "Please input image 2!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image3"
            label="Image 3"
            rules={[
              {
                required: true,
                message: "Please input image 3!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image4"
            label="Image 4"
            rules={[
              {
                required: true,
                message: "Please input image 4!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[
              {
                required: true,
                message: "Please input color!",
              },
            ]}
          >
            <CheckboxGroup options={color} />
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
            rules={[
              {
                required: true,
                message: "Please input size!",
              },
            ]}
          >
            <CheckboxGroup options={sizes} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {data?.key ? "Update product" : "Add product"}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormProduct;
