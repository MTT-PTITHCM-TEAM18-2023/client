import { authGet, authPost } from "./axiosClient";

export const fetchCategory = (params) => {
  const url = `/category`;
  return authGet(url, params);
};

export const createCategory = (params) => {
  const url = `/category`;
  return authPost(url, params);
};
