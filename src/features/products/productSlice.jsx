import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/products.json";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: products,
  },
  reducers: {},
});

export const selectAllProducts = (state) => state.products.items;
export default productSlice.reducer;
