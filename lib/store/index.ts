import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import orderReducer from "./slices/order";
import productReducer from "./slices/product";

export const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
        product: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;