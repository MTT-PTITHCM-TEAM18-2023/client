import { authGet } from "./axiosClient";

export const fetchCategory = (params) => {
  const url = `/category`
  return authGet(url, params)
}
