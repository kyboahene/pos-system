import { createSlice } from "@reduxjs/toolkit";
import { PRODUCT } from "../initial-states/product";
import SLICE_TYPES from "../slice-types";

const productSlice = createSlice({
    name: SLICE_TYPES.USER,
    initialState: PRODUCT,
    reducers: {
        createProduct: (state, action) => {
            state.products = action.payload
        },
    }
})

export const { createProduct } = productSlice.actions

export default productSlice.reducer