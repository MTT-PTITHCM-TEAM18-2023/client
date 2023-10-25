import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkoutSendOTP, checkoutVerify, placeOrder } from "../../apis/user";
import ProductSeen from "../../components/ProductSeen";
import { deleteCart, updateCart } from "../../store/cart";
import history from "../../common/utils/history";
import ShowBill from "./ShowBill";
import "./style.scss";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "VND",
});
function CartPage() {
  const { t } = useTranslation();
  const cart = useSelector((state) => state?.cart);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });
  const [listOrder, setListOrder] = useState([]);
  const [totalMoneyListOrder, setTotalMoneyListOrder] = useState(0);
  const [infoUser, setInfoUser] = useState({
    email: "",
    code: "",
    name: "",
    phone: "",
    address: "",
    listOrder: [],
  });
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: `${t("cartPage.product")}`,
      dataIndex: "product",
      render: ({ id, img, name }) => (
        <div className="product-info-cart">
          <div className="product-info-cart__img mr-10">
            <img
              className="w-[100px] h-[100px] object-cover"
              src={img}
              alt={name}
            />
          </div>
          <div className="product-info-cart__content">
            <Link
              to={"products/" + id}
              className="product-info-cart__content__link"
            >
              {name}
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: `${t("cartPage.price")}`,
      dataIndex: "price",
      render: (value) => <p>{formatter.format(value)}</p>,
    },
    {
      title: `${t("cartPage.quantity")}`,
      dataIndex: "order",
      render: ({ index, order, quantity }) => {
        return (
          <InputNumber
            // disabled={disabledInput.includes(id + color + size) ? true : false}
            min={1}
            max={quantity}
            defaultValue={order}
            onChange={(value) => {
              updateQuantityCartItem({ index, order: value });
            }}
          />
        );
      },
      colSpan: 1,
    },
    {
      title: `${t("cartPage.total")}`,
      dataIndex: "total",
      render: (value) => <p>{formatter.format(value)}</p>,
    },
    {
      title: `${t("cartPage.action")}`,
      key: "action",
      dataIndex: "action",
      render: (index) => (
        <Space size="middle">
          <Popconfirm
            title={t("cartPage.messageDeleteProduct")}
            onConfirm={() => {
              handleDeleteCartItem(index);
            }}
            okText="Yes"
            cancelText="No"
          >
            <i className="fas fa-trash"></i>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setData(
      cart.list.map((item, index) => ({
        key: item.id,
        product: {
          id: item.id,
          name: item.name,
          img: item.imageUrl,
        },
        price: item.price,
        order: {
          index,
          order: item.order,
          id: item.id,
          quantity: item.qty,
        },
        total: item.order * item.price,
        action: index,
      }))
    );
  }, [cart]);

  const rowSelection = {
    onChange: (_, selectedRows) => {
      let total = selectedRows.reduce((totalNow, item) => {
        return totalNow + item.total;
      }, 0);
      setTotalMoneyListOrder(total);
      const dataOrder = selectedRows.map((item) => ({
        product_id: item?.product?.id,
        qty: item?.order?.order,
      }));
      setInfoUser((pre) => ({ ...pre, listOrder: dataOrder }));
      setListOrder(selectedRows);
    },
  };

  function updateQuantityCartItem({ order, index }) {
    dispatch(updateCart({ index, order }));
  }

  function handleDeleteCartItem(index) {
    dispatch(deleteCart([index]));
    message.success("Xóa sản phẩm thành công");
  }

  function handleTableChange(pagination) {
    setPagination(pagination);
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }

  const handleGetCode = async () => {
    if (infoUser.email) {
      checkoutSendOTP({ email: infoUser.email });
      message.success("Mã code đã được gửi về mail: " + infoUser.email);
    } else {
      message.error("Vui lòng nhập mail và gửi lại");
    }
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      if (!listOrder.length) {
        message.error("Vui lòng chọn sản phẩm");
        return;
      }
      const resCheckoutVerify = await checkoutVerify({
        email: infoUser.email,
        code: infoUser.code,
      });
      if (resCheckoutVerify?.data?.status === "ERROR") {
        message.error(resCheckoutVerify?.data?.message);
        return;
      }
      if (resCheckoutVerify?.data?.status === "OK") {
        localStorage.setItem(
          "authentication_token",
          resCheckoutVerify.data?.data?.jwt
        );
        const res = await placeOrder({
          items: infoUser.listOrder,
          customer: {
            phone: infoUser.phone,
            name: infoUser.name,
            address: infoUser.address,
          },
        });
        if (res.data?.status === "OK") {
          message.success("Bạn đã đặt hàng thành công");
          history.push("/");
          const indexOrder = listOrder.map((item) => item?.order?.index);
          console.log("indexOrder:", indexOrder);
          dispatch(deleteCart(indexOrder));
        } else {
          res.error(resCheckoutVerify?.data?.message);
        }
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page mt-50">
      <Container>
        <Row>
          <Col xl={8} sm={12}>
            <div className="cart-page__table">
              <Table
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={pagination}
                onChange={handleTableChange}
              />
            </div>
          </Col>
          <Col xl={4} sm={12}>
            <div className="cart-page__order">
              <h2 className="cart-page__order__title">
                {t("cartPage.titleOrder")}
              </h2>
              <ul className="cart-page__order__list">
                <ShowBill
                  listOrder={listOrder}
                  totalMoneyListOrder={totalMoneyListOrder}
                />
              </ul>
              <Form onFinish={handleCheckout}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Email",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập email"
                    value={infoUser.value}
                    onChange={(e) =>
                      setInfoUser((pre) => ({ ...pre, email: e.target.value }))
                    }
                  />
                </Form.Item>
                <div className="flex justify-center mb-10">
                  <Button
                    type="primary"
                    className="btn btn--primary  w-auto"
                    onClick={handleGetCode}
                  >
                    Nhận mã code
                  </Button>
                </div>

                <Form.Item
                  name="code"
                  label="Code"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Code",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập code"
                    value={infoUser.code}
                    onChange={(e) =>
                      setInfoUser((pre) => ({ ...pre, code: e.target.value }))
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Tên"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên"
                    value={infoUser.name}
                    onChange={(e) =>
                      setInfoUser((pre) => ({ ...pre, name: e.target.value }))
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="SDT"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                  ]}
                >
                  <InputNumber
                    className="w-full"
                    placeholder="Nhập số điện thoại"
                    value={infoUser.phone}
                    onChange={(value) =>
                      setInfoUser((pre) => ({ ...pre, phone: value }))
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập địa chỉ"
                    value={infoUser.address}
                    onChange={(e) =>
                      setInfoUser((pre) => ({
                        ...pre,
                        address: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn btn--primary btn--payment"
                    disabled={loading}
                  >
                    Đặt hàng
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12} sm={12}>
            <ProductSeen />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CartPage;
