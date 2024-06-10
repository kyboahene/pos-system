import { createSlice } from "@reduxjs/toolkit";
import SLICE_TYPES from "../slice-types";
import { CART } from "../initial-states/cart";

const cartSlice = createSlice({
    name: SLICE_TYPES.CART,
    initialState: CART,
    reducers: {
        addSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        addCart: (state, action) => {
            state.cart = action.payload
        },
    }
})

export const { addCart, addSelectedProduct } = cartSlice.actions

export default cartSlice.reducer