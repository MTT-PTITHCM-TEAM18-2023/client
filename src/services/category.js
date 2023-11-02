import { authGet, authPost, authPut } from './axiosClient';

export const fetchCategory = (params) => {
  const url = `/category`;
  return authGet(url, params);
};

export const createCategory = (params) => {
  const url = `/category`;
  return authPost(url, params);
};

export const updateCategory = (params) => {
  const url = `/category`;
  return authPut(url, params);
};
