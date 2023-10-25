import React, { useState, useEffect } from "react";
import { Button, Modal, Space, Table, Tag, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "src/store";
import { toast } from "react-toastify";
import UpdateOrderStatusForm from "src/components/organisms/admin/UpdateOrderStatusForm";
import { fetchOrderDetail, changeOrderStatus } from "src/apis";
import {
  UPDATE_STATUS_ORDER_SUCCESS,
  UPDATE_STATUS_ORDER_FAILED,
} from "src/constants/messageCode";

function OrderList() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orders = useSelector((state) => state.orders);
  const [currentOrder, setCurrentOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders({ page, limit: 10 }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (_, { customer }) => (
        <Space direction="vertical">
          <Typography>{customer?.name ?? ""}</Typography>
          <Typography>{customer?.email ?? ""}</Typography>
        </Space>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "order_date",
      key: "order_date",
      render: (_, { order_date }) => (
        <Typography>{new Date(order_date).toLocaleDateString()}</Typography>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "total",
      key: "total",
      render: (_, { total }) => (
        <Typography>{Number(total).toLocaleString("en") + " Đ"}</Typography>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "order_status",
      key: "order_status",
      render: (_, { order_status }) => <Tag>{order_status}</Tag>,
    },
    {
      title: "Chi tiết",
      key: "action",
      render: (_, { id }) => (
        <Button onClick={() => handleOpenDetailForm(id)}>Chi tiết</Button>
      ),
    },
  ];

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleOpenDetailForm = async (id) => {
    const res = await fetchOrderDetail(id);
    setCurrentOrder(res.data.data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitUpdateOrderStt = async (id) => {
    try {
      if (currentOrder) {
        await changeOrderStatus(currentOrder.id, id);
        dispatch(getOrders({ page, limit: 10 }));
        toast.success(UPDATE_STATUS_ORDER_SUCCESS);
      }
    } catch {
      toast.error(UPDATE_STATUS_ORDER_FAILED);
      closeModal();
    }
  };

  return (
    <div>
      {/* Motal create product */}
      <Modal
        title="Thông tin sản phẩm"
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
      >
        <UpdateOrderStatusForm
          onSubmit={handleSubmitUpdateOrderStt}
          data={currentOrder}
        />
      </Modal>
      <Table
        dataSource={orders.list}
        columns={columns}
        pagination={{
          pageSize: 10,
          defaultCurrent: 1,
          current: page,
          onChange: handlePageChange,
          total: orders.meta.totalItems,
          showSizeChanger: false,
        }}
      />
    </div>
  );
}

export default OrderList;
