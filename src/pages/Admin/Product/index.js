import { Button, Input, message, Popconfirm, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import Space from "antd/lib/space";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import {
//   cleareMessageProduct,
//   deleteProduct,
//   getKeySearch,
//   getProductList,
// } from "../../../actions/product";
import FormProduct from "./FormProduct";
import "./style.scss";

function ProductAdminPage(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [productEditting, setProductEditting] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    // dispatch(getProductList({ _page: "", _limit: 1000 }));
    if (
      products.isDeleteProductSuccess &&
      products.messageDeleteProduct === "success"
    ) {
      message.success("Delete success")
      // dispatch(cleareMessageProduct());
    }
    if (
      !products.isDeleteProductSuccess &&
      products.messageDeleteProduct === "error"
    ) {
      message.error("Delete Error")
      // dispatch(cleareMessageProduct());
    }
  }, [dispatch, products.isDeleteProductSuccess, products.messageDeleteProduct])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [typeActionForm, setTypeActionForm] = useState()

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleDeleteProduct = (vaule) => {
    // dispatch(deleteProduct(vaule.key));
  }

  const handleEditProduct = (value) => {
    setProductEditting(value)
    setTypeActionForm("edit")
    setIsModalVisible(true)
  }

  const handleAddProduct = () => {
    setProductEditting({})
    setIsModalVisible(true)
    setTypeActionForm("add")
  }

  const handleKeySearch = (e) => {
    // dispatch(getKeySearch(e.target.value));
  }

  function handleTableChange(pagination) {
    setPagination(pagination.current);
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (url) => (
        <div className="list-ordered__img">
          <img src={url[0]} alt="imgProduct" />
        </div>
      ),
    },
    {
      title: "Desciption",
      dataIndex: "description",
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (text) => {
        return text.join(", ");
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      render: (text) => {
        return text.join(", ");
      },
    },
    {
      title: `${t("cartPage.price")}`,
      dataIndex: "price",
      render: (value) => <p>{formatter.format(value)}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Popconfirm
            title={t("cartPage.messageDeleteProduct")}
            onConfirm={() => {
              handleDeleteProduct(id);
            }}
            okText="Yes"
            cancelText="No"
            className="btn-cursor"
          >
            <i className="fas fa-trash"></i>
          </Popconfirm>
          <Button
            onClick={() => handleEditProduct(id)}
            className="btn--editProduct"
          >
            <i className="fas fa-pen"></i>
          </Button>
        </Space>
      ),
    },
  ];

  const data = [...products.listProduct].reverse().map((item) => {
    return {
      key: item.id,
      name: item.name,
      image: item.link_img,
      description: item.description,
      price: item.price,
      color: item.color,
      size: item.size,
      categoryId: item.categoryId,
      discount: item.discount,
    };
  });

  return (
    <div className="product-admin-page">
      <div className="product-admin-page__action d-flex justify-content-space-between align-items-center">
        <Button type="primary" onClick={handleAddProduct}>
          <i className="fas fa-plus"></i> Add Product
        </Button>
        <Modal
          title={productEditting?.key ? "Update product" : "Add product"}
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1000}
          footer=""
          style={{ top: "50px" }}
        >
          {typeActionForm === "add" ? (
            <FormProduct data={productEditting} onCloseModal={handleCancel} />
          ) : (
            <FormProduct data={productEditting} onCloseModal={handleCancel} />
          )}
        </Modal>
        <Input placeholder="Search Product..." onChange={handleKeySearch} />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={pagination}
      />
    </div>
  );
}

export default ProductAdminPage;
