import axios from 'axios';
import { authPost } from './axiosClient';
import { API_LOGIN, API_REGISTER } from 'src/constants/apiUrl';
import { baseURL } from 'src/constants/baseURL';

export const checkoutSendOTP = (data) => {
  const url = '/checkout/send-otp';
  return authPost(url, data);
};

export const checkoutVerify = (data) => {
  const url = '/checkout/verify';
  return authPost(url, data);
};

export const placeOrder = (data) => {
  const url = 'checkout/place-order';
  const token = localStorage.getItem('authentication_token');
  console.log('token', token);
  return axios.post(baseURL + url, data, {
    headers: {
      authorization: `beare ${token}`,
    },
  });
};

export const loginService = (data) => {
  return authPost(API_LOGIN, data);
};

export const registerService = (data) => {
  return authPost(API_REGISTER, data);
};
