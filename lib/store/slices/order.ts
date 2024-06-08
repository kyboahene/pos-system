import { createSlice } from "@reduxjs/toolkit";
import { ORDER } from "../initial-states/order";
import SLICE_TYPES from "../slice-types";

const orderSlice = createSlice({
    name: SLICE_TYPES.USER,
    initialState: ORDER,
    reducers: {
        addOrder: (state, action) => { },
    }
})

export const { addOrder } = orderSlice.actions

export default orderSlice.reducer