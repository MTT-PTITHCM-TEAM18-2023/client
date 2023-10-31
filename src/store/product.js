import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../services";

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

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ page, category }) => {
    const resProduct = await fetchProducts({
      page: page ?? 1,
      limit: 10,
      cat: category ?? "",
    });
    return resProduct?.data?.data ?? { item: [], data: initialState.data };
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.items;
      state.meta = action.payload.meta;
      state.error = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default productSlice.reducer;
