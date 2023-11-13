import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, message } from 'antd';
import { getSupplier, createSupplier, updateSupplier } from 'src/services';
import CreateSupplierForm from 'src/components/organisms/admin/CreateSupplierForm';
import { MSG } from 'src/constants/messageCode';
import UpdateSupplierForm from 'src/components/organisms/admin/UpdateSupplierForm';

const Provider = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [openEditSupplier, setOpenEditSupplier] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, sup) => (
        <Space size="middle">
          <Button onClick={() => handleEditsupplier(sup)}>Chỉnh sửa</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const res = await getSupplier({ limit: 10, page: page });
      console.log('res', res);
      setSuppliers(res.data.items);
      setTotal(res.data.meta.totalItems);
    })();
  }, [page]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCreatesupplier = async (formValues) => {
    const res = await createSupplier(formValues);
    console.log('res', res);
    const newData = await getSupplier({ limit: 10, page: page });
    message.success(MSG?.[res.data.message] ?? 'Thêm nhà cung cấp thành công');
    setSuppliers(newData.data.items);
    setTotal(newData.data.meta.totalItems);
    handleCloseCreateModal();
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditsupplier = async (data) => {
    setSupplier(data);
    setOpenEditSupplier(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditSupplier(false);
  };

  const handleSubmitUpdateSupplier = async (formValues) => {
    console.log('formValues', formValues);
    try {
      const res = await updateSupplier({ id: supplier.id, ...formValues });
      message.success(
        MSG?.[res.data.message] ?? 'Cập nhật nhà cung cấp thành công'
      );

      const newdata = await getSupplier({ limit: 10, page: page });
      setSuppliers(newdata.data.items);
      setTotal(newdata.data.meta.totalItems);
      handleCloseEditModal();
    } catch {
      message.error('Cập nhật nhà cung cấp thất bại');
    }
  };

  return (
    <div>
      <Button onClick={handleOpenCreateModal}>Thêm nhà cung cấp</Button>
      <Modal
        title="Thêm nhà cung cấp"
        open={isCreateModalOpen}
        footer={null}
        onCancel={handleCloseCreateModal}
      >
        {isCreateModalOpen && (
          <CreateSupplierForm obSubmit={handleCreatesupplier} />
        )}
      </Modal>

      {openEditSupplier && (
        <Modal
          title="Cập nhật"
          open={openEditSupplier}
          footer={null}
          onCancel={handleCloseEditModal}
        >
          <UpdateSupplierForm
            onSubmit={handleSubmitUpdateSupplier}
            defaultValues={supplier}
          />
        </Modal>
      )}

      <Table
        dataSource={suppliers}
        columns={columns}
        pagination={{
          pageSize: 10,
          defaultCurrent: 1,
          current: page,
          onChange: onPageChange,
          total: total,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default Provider;
