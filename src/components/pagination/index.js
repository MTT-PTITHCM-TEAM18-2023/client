import React from 'react';
import { Pagination } from 'antd';
import './style.scss';
import { useSelector } from 'react-redux';

function PaginationContainer() {
  const filters = useSelector((state) => state.filters);
  const pagination = useSelector((state) => state.pagination);

  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
    // dispatch(getPageLimitNumber({ page: current, limit: pageSize }));
  }

  function onChange(pageNumber) {
    console.log(pageNumber);
    // dispatch(getPageNumber(pageNumber));
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth',
    });
  }

  return (
    <div className="pagination-content">
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        current={filters._page}
        total={pagination.totalPages}
        pageSizeOptions={['6', '9', '12']}
        pageSize={filters._limit}
        onChange={onChange}
      />
    </div>
  );
}

export default PaginationContainer;
