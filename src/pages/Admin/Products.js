import React, { useEffect, useState } from 'react';
import { Image, Button, Modal, Space, Table, Tag, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from 'src/store';
import CreateProductForm from 'src/components/organisms/admin/CreateProductForm';
import EnterProductForm from 'src/components/organisms/admin/EnterProductForm';
import axiosClient, { authHeaders } from 'src/services/axiosClient';
import EditProductForm from 'src/components/organisms/admin/EditProductForm';
import { updateProductApi, deleteProductApi } from 'src/services';
import { MSG } from 'src/constants/messageCode';

const Products = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEnterOpen, setIsModalEnterOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ page }));
  }, [dispatch, page]);

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (_, { imageUrl }) => (
        <Image
          width={120}
          height={120}
          style={{ objectFit: 'cover' }}
          src={imageUrl}
        />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (_, { isActive }) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'isActive',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEnterModal(record)}>Nhập hàng</Button>
          <Button onClick={() => showEditModal(record)}>Chỉnh sửa</Button>
          <Button onClick={() => handleDeleteProduct(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];
  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (product) => {
    setIsModalEditOpen(true);
    setEditingProduct(product);
  };

  const showEnterModal = (product) => {
    setIsModalEnterOpen(true);
    setEditingProduct(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEnterModal = () => {
    setIsModalEnterOpen(false);
  };

  const closeEditModal = () => {
    setIsModalEditOpen(false);
  };
  const handleCreateProduct = async (formValues) => {
    const dataTransfer = {
      ...formValues,
      qty: 0,
      isActive: true,
    };
    try {
      const res = await axiosClient.post('/products', dataTransfer, {
        headers: authHeaders(),
      });
      console.log('rés', res);
      closeModal();
      message.success(MSG.CREATE_PRODUCT_SUCCESS);
    } catch {
      message.error(MSG.CREATE_PRODUCT_FAILED);
    }
  };

  const handleEnterProduct = async (formValues) => {
    console.log('formValues', formValues);
    const { id, ...data } = editingProduct;
    await updateProductApi(id, {
      ...data,
      qty: data.qty + formValues.qty,
    });
    message.success('Nhập sản phẩm thành công');
  };

  const handleEditProduct = async (formValues) => {
    console.log('formValues', formValues);
    const { id, ...data } = editingProduct;
    try {
      const res = await updateProductApi(id, { ...data, ...formValues });
      message.error(MSG?.[res.data?.message] ?? MSG.UPDATE_PRODUCT_SUCCESS);
    } catch {
      message.error(MSG.UPDATE_PRODUCT_FAILED);
    }
  };

  const handleDeleteProduct = async (id) => {
    console.log('id', id);
    try {
      await deleteProductApi(id);
      dispatch(getProducts({ page }));
      message.success('Xóa sản phẩm thành công');
    } catch {
      message.error('Xóa sản phẩm thất bại');
    }
  };

  return (
    <div>
      <Button onClick={showModal}>+ Tạo sản phẩm</Button>
      {/* Motal create product */}
      <Modal
        title="Thông tin sản phẩm"
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
      >
        <CreateProductForm onSubmit={handleCreateProduct} />
      </Modal>
      {/* Motal enter product */}
      <Modal
        title="Nhập sản phẩm"
        open={isModalEnterOpen}
        footer={null}
        onCancel={closeEnterModal}
      >
        <EnterProductForm onSubmit={handleEnterProduct} />
      </Modal>
      {/* Motal edit product */}
      <Modal
        title="Chỉnh sửa sản phẩm"
        open={isModalEditOpen}
        footer={null}
        onCancel={closeEditModal}
      >
        <EditProductForm
          onSubmit={handleEditProduct}
          editeProduct={editingProduct}
        />
      </Modal>
      {/* Table product list */}
      <Table
        dataSource={products.list}
        columns={columns}
        pagination={{
          pageSize: 10,
          defaultCurrent: 1,
          current: page,
          onChange: onPageChange,
          total: products.meta.totalItems,
          showSizeChanger: false,
        }}
      />
      ;
    </div>
  );
};

export default Products;
