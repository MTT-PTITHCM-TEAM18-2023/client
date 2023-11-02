import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, message } from 'antd';
import { fetchCategory, createCategory, updateCategory } from 'src/services';
import CreateCategoryForm from 'src/components/organisms/admin/CreateCategoryForm';
import { MSG } from 'src/constants/messageCode';
import UpdateCategoryForm from 'src/components/organisms/admin/UpdateCategoryForm';

const Category = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, cat) => (
        <Space size="middle">
          <Button onClick={() => handleEditCategory(cat)}>Chỉnh sửa</Button>
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
    console.log('res', res);
    handleCloseCreateModal();
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditCategory = async (data) => {
    setCategory(data);
    setOpenEditCategory(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditCategory(false);
  };

  const handleSubmitUpdateCategory = async (formValues) => {
    try {
      const res = await updateCategory({ id: category.id, ...formValues });
      console.log('res', res);
      message.success(MSG?.[res.data.message] ?? '');

      const newdata = await fetchCategory({ limit: 10, page: page });
      setCategories(newdata.data.data.items);
      setTotal(newdata.data.data.meta.totalItems);
      handleCloseEditModal();
    } catch {
      message.error(MSG.UPDATE_CAT_FAILED);
    }
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

      {openEditCategory && (
        <Modal
          title="Cập nhật danh mục"
          open={openEditCategory}
          footer={null}
          onCancel={handleCloseEditModal}
        >
          <UpdateCategoryForm
            obSubmit={handleSubmitUpdateCategory}
            defaultValues={{
              name: category.name,
            }}
          />
        </Modal>
      )}

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
