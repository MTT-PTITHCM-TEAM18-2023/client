import React from "react";
import { Pagination } from "antd";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getPageLimitNumber,
//   getPageNumber,
// } from "../../actions/control-action";

function PaginationContainer(props) {
  const filters = useSelector((state) => state.filters);
  const pagination = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  function onShowSizeChange(current, pageSize) {
    // dispatch(getPageLimitNumber({ page: current, limit: pageSize }));
  }

  function onChange(pageNumber) {
    // dispatch(getPageNumber(pageNumber));
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }

  return (
    <div className="pagination-content">
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        current={filters._page}
        total={pagination.totalPages}
        pageSizeOptions={["6", "9", "12"]}
        pageSize={filters._limit}
        onChange={onChange}
      />
    </div>
  );
}

export default PaginationContainer;
