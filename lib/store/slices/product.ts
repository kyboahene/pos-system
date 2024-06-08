import { createSlice } from "@reduxjs/toolkit";
import { PRODUCT } from "../initial-states/product";
import SLICE_TYPES from "../slice-types";

const productSlice = createSlice({
    name: SLICE_TYPES.USER,
    initialState: PRODUCT,
    reducers: {
        addProduct: (state, action) => { },
    }
})

export const { addProduct } = productSlice.actions

export default productSlice.reducer