import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "src/services";

const initialState = {
  list: [],
  meta: {
    itemCount: 0,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 1,
  },
  loading: false,
  error: false,
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async ({ page, limit }) => {
    const resOrders = await fetchOrders({
      page: page ?? 1,
      limit: limit ?? 10,
    });
    return resOrders?.data?.data ?? { item: [], data: initialState.data };
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.items;
      state.meta = action.payload.meta;
      state.error = false;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default ordersSlice.reducer;
