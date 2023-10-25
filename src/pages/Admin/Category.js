import { useEffect, useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import { fetchCategory, createCategory } from "src/apis";
import CreateCategoryForm from "src/components/organisms/admin/CreateCategoryForm";

const Category = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>Chỉnh sửa</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const res = await fetchCategory({ limit: 10, page: page });
      setCategories(res.data.data.items);
      setTotal(res.data.data.meta.totalItems);
    })();
  }, [page]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCreateCategory = async (formValues) => {
    const res = await createCategory(formValues);
    console.log("res", res);
    handleCloseCreateModal();
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditCategory = async ({ id, name }) => {
    setCategory({ id, name });
    setOpenEditCategory(true);
  };

  return (
    <div>
      <Button onClick={handleOpenCreateModal}>Thêm danh mục</Button>
      <Modal
        title="Tạo danh mục"
        open={isCreateModalOpen}
        footer={null}
        onCancel={handleCloseCreateModal}
      >
        {isCreateModalOpen && (
          <CreateCategoryForm obSubmit={handleCreateCategory} />
        )}
      </Modal>

      <Table
        dataSource={categories}
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

export default Category;
