import axiosClient from './axiosClient';
import { API_SUPPLIER } from '../constants/apiUrl';
import { authPut, authPost } from './axiosClient';

export const getSupplier = (params) =>
  axiosClient.get(`${API_SUPPLIER}`, { params }).then((res) => res.data);

export const createSupplier = (params) => {
  return authPost(API_SUPPLIER, params);
};

export const updateSupplier = (params) => {
  return authPut(API_SUPPLIER, params);
};
