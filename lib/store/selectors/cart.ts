import { RootState } from ".."

export const getCart = (state: RootState) => state.cart
export const getSelectedProduct = (state: RootState) => state.cart.selectedProduct
