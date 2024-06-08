import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../initial-states/user";
import SLICE_TYPES from "../slice-types";

const userSlice = createSlice({
    name: SLICE_TYPES.USER,
    initialState: USER,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload,
                state.isAuthenticated = true
        },
        logOut: (state) => {
            state.name = '',
                state.isAuthenticated = false
        }
    }
})

export const { setUser, logOut } = userSlice.actions

export default userSlice.reducer