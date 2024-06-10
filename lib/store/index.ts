import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart"
import userReducer from "./slices/user";
import orderReducer from "./slices/order";
import productReducer from "./slices/product";

export const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
        product: productReducer,
        cart: cartReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;