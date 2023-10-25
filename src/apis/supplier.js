import axiosClient from "./axiosClient";
import { API_SUPPLIER } from "../constants/apiUrl";

export const getSupplier = (params) =>
  axiosClient.get(`${API_SUPPLIER}`, { params }).then((res) => res.data);
