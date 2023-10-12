import { authPost } from "./axiosClient"

export const checkoutSendOTP = (data) => {
  const url = "/checkout/send-otp"
  return authPost(url, data)
}

export const checkoutVerify = (data) => {
  const url = "/checkout/verify"
  return authPost(url, data)
}

export const placeOrder = (data) => {
  const url = "/checkout/place-order"
  return authPost(url, data)
}
