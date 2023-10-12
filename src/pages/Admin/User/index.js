import {
  Button,
  Input,
  message,
  Popconfirm,
  Radio,
  Space,
  Table,
  Form,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   cleareMessageUser,
//   deleteUser,
//   getListUser,
//   searchUser,
//   updateProfileUser,
// } from "../../../actions/user";
import "./style.scss";

function UserAdminPage(props) {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idUser, setIdUser] = useState();

  useEffect(() => {
    if (user.isUpdated && user.messageUpdateSuccess) {
      message.success("Update user success")
      setIsModalVisible(false)
      // dispatch(cleareMessageUser());
    }
    if (!user.isUpdated && user.errorUpdateProfileMessage) {
      message.error("Update user error")
      // dispatch(cleareMessageUser());
    }
    if (user.isDelete && user.messageDeleteUser === "success") {
      message.success("Delete user success")
      // dispatch(cleareMessageUser());
    }
    if (!user.isDelete && user.messageDeleteUser === "error") {
      message.error("Delete user error")
      // dispatch(cleareMessageUser());
    }
  }, [dispatch, user])

  useEffect(() => {
    // dispatch(getListUser());
  }, [dispatch])

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  function handleDeleteUser(value) {
    // dispatch(deleteUser(value.id));
  }

  const handleEditUser = (values) => {
    // dispatch(updateProfileUser({ data: values, idUser: idUser }));
  }

  const opendFormUpdateUser = (value) => {
    form.setFieldsValue(value)
    setIdUser(value.id)
    setIsModalVisible(true)
  }

  const handleKeySearchUser = (e) => {
    // dispatch(searchUser(e.target.value));
  }

  const columns = [
    {
      title: "ID User",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <>
          {value.role === "admin" ? (
            ""
          ) : (
            <Space size="middle">
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleDeleteUser(value)}
                okText="Yes"
                cancelText="No"
                className="btn-cursor"
              >
                <i className="fas fa-trash"></i>
              </Popconfirm>
              <Button
                className="btn--editProduct"
                onClick={() => opendFormUpdateUser(value)}
              >
                <i className="fas fa-pen"></i>
              </Button>
            </Space>
          )}
        </>
      ),
    },
  ];

  const data = user.listUser?.map((user) => {
    return {
      key: user.id,
      id: user.id,
      email: user.email,
      password: user.password,
      role: user?.role || "user",
    };
  });

  return (
    <div className="product-admin-page">
      <Modal
        title="Edit User"
        visible={isModalVisible}
        footer={""}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="Updata User"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={handleEditUser}
        >
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please choose a role" }]}
          >
            <Radio.Group>
              <Space direction="horizontal">
                <Radio value={"admin"}>Admin</Radio>
                <Radio value={"user"}>User</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="product-admin-page__action user-admin-page__action d-flex align-items-center">
        <Input placeholder="Search User..." onChange={handleKeySearchUser} />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default UserAdminPage;
