import { authPost } from "./axiosClient";
import { API_LOGIN, API_REGISTER } from "src/constants/apiUrl";

export const checkoutSendOTP = (data) => {
  const url = "/checkout/send-otp";
  return authPost(url, data);
};

export const checkoutVerify = (data) => {
  const url = "/checkout/verify";
  return authPost(url, data);
};

export const placeOrder = (data) => {
  const url = "/checkout/place-order";
  return authPost(url, data);
};

export const loginService = (data) => {
  return authPost(API_LOGIN, data);
};

export const registerService = (data) => {
  return authPost(API_REGISTER, data);
};
