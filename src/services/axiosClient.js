import axios from 'axios';
import queryString from 'query-string';
import { baseURL } from 'src/constants/baseURL';

//set up default config for http requests here
const axiosClient = axios.create({
  baseURL: baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
  headers: authHeaders(),
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export function authHeaders() {
  const token = localStorage.getItem('authentication_token');
  const headers = {
    Authorization: 'beare ' + token,
    Accept: 'application/json',
    'Accept-Language': 'vi',
  };
  return headers;
}

export async function authGet(url, params) {
  return await axiosClient.get(url, { params, headers: authHeaders() });
}

export async function authPut(url, params = {}) {
  return await axiosClient.put(url, params, { headers: authHeaders() });
}

export async function authPatch(url, params = {}) {
  return await axiosClient.patch(url, params, { headers: authHeaders() });
}

export async function authPost(url, params) {
  console.log('params', params);
  return await axiosClient.post(url, params);
}

export async function authDelete(url) {
  return await axiosClient.delete(url, { headers: authHeaders() });
}

export default axiosClient;
