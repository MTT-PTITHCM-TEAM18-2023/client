import React, { useEffect, useState } from "react";
import { fetchOrderStatus } from "src/apis";
import { Typography, List, Select, Space, Button } from "antd";

const UpdateOrderStatusForm = ({ data, onSubmit }) => {
  const [orderStatus, setOrderStatus] = useState([]);
  const [newStt, setNewStt] = useState(1);

  useEffect(() => {
    (async () => {
      const resStatus = await fetchOrderStatus();
      const data = resStatus.data.data.items;
      setOrderStatus(data);
      const stt = data.find((item) => item.name === data.order_status);
      console.log("stt", stt);
      stt && setNewStt(stt.id);
    })();
  }, [data.order_status]);

  const handleChange = (value) => {
    setNewStt(value);
  };

  const handleSubmit = () => {
    onSubmit(newStt);
  };
  return (
    <Space>
      <Typography>Chi tiết đơn hàng</Typography>
      <List
        itemLayout="horizontal"
        dataSource={data.items}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={`${item.price} x ${item.qty}`}
            />
          </List.Item>
        )}
      />

      <Typography>
        Tổng tiền: {Number(data.total).toLocaleString("en") + " Đ"}
      </Typography>

      <br></br>
      <Typography>Trạng thái</Typography>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={orderStatus.map((stt) => ({ value: stt.id, label: stt.name }))}
      />
      <Button onClick={handleSubmit}>Lưu</Button>
    </Space>
  );
};

export default UpdateOrderStatusForm;
