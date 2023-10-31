import axiosClient, { authGet, authPost } from './axiosClient';

export const fetchOrders = (params) => {
  const url = `/order/pending`;
  // return authGet(url, params); TODO: handle authentication
  const token = localStorage.getItem('authentication_token');

  return axiosClient.get(url, {
    headers: { Authorization: `beare ${token}` },
    params,
  });
};

export const fetchOrderStatus = () => {
  const url = `/order/status`;
  return authGet(url);
};

export const changeOrderStatus = ({ id, status_id }) => {
  const url = '/order/change-status';
  return authPost(url, { id, status_id });
};

export const fetchOrderDetail = ({ id }) => {
  const url = `/order/detail/${id}`;
  return authGet(url);
};
