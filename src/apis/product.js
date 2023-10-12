import { authDelete, authGet, authPatch, authPost } from "./axiosClient";

export const fetchProductLatest = () => {
  const url = `/products?productLatest=true&_limit=8`;
  return authGet(url);
};

export const fetchProductComing = () => {
  const url = `/products?productComing=true&_limit=8`;
  return authGet(url);
};

export const fetchProducts = (params) => {
  const url = `/products`
  return authGet(url, params)
}

export const fetchProductDetail = (id) => {
  const url = `/products/${id}`
  return authGet(url)
}

export const fetchProductsBySearch = (keySearch) => {
  const url = `/products?q=${keySearch}`;
  return authGet(url);
};

export const addProductApi = (data) => {
  const url = "/products";
  return authPost(url, data);
};

export const deleteProductApi = (id) => {
  const url = `/products/${id}`;
  return authDelete(url);
};

export const updateProductApi = (id, data) => {
  const url = `/products/${id}`;
  return authPatch(url, data);
};
