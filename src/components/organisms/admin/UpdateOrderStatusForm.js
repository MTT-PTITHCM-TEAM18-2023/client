import React, { useEffect, useState } from 'react';
import { fetchOrderStatus } from 'src/services';
import { Typography, List, Form, Select, Space, Button } from 'antd';

const UpdateOrderStatusForm = ({ data, onSubmit }) => {
  const [orderStatus, setOrderStatus] = useState([]);
  const [newStt, setNewStt] = useState(() => data.order_status);

  useEffect(() => {
    (async () => {
      const resStatus = await fetchOrderStatus();
      const dataRes = resStatus.data.data.items;
      setOrderStatus(dataRes);
    })();
  }, [data.order_status]);

  const handleChange = (value) => {
    setNewStt(value);
  };

  const handleSubmit = () => {
    const stt = orderStatus.filter((item) => item.name == newStt);
    stt[0] && onSubmit(stt[0].id);
  };
  return (
    <Form
      onFinish={handleSubmit}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Chi tiết">
        <List
          itemLayout="horizontal"
          dataSource={data.items}
          style={{ maxHeight: '300px', overflow: 'scroll' }}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={item.name}
                description={`${item.price} x ${item.qty}`}
              />
            </List.Item>
          )}
        />
      </Form.Item>
      <Form.Item label="Tổng tiền">
        <Typography>
          {Number(data.total).toLocaleString('en') + ' Đ'}
        </Typography>
      </Form.Item>
      <Form.Item label="Trạng thái">
        <Select
          defaultValue={newStt}
          onChange={handleChange}
          options={orderStatus.map((stt) => ({
            value: stt.name,
            label: stt.name,
          }))}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="submit">Lưu</Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateOrderStatusForm;
