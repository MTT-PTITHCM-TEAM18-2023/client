import { authDelete, authGet, authPatch, authPost } from "./axiosClient";

export const fetchOrders = (params) => {
  const url = `/order/pending`;
  return authGet(url, params);
};

export const fetchOrderStatus = () => {
  const url = `/order/status`;
  return authGet(url);
};

export const changeOrderStatus = ({ id, status_id }) => {
  const url = "/order/change-status";
  return authPost(url, {
    body: { id, status_id },
  });
};

export const fetchOrderDetail = ({ id }) => {
  const url = `/order/detail/${id}`;
  return authGet(url);
};
