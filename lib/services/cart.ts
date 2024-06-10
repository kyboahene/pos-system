import { Cart } from "@/types"
import { mockAPICall } from "../utils"

export async function createCart(cart: Cart) {
    let tempAllCart: Cart[] = []

    try {
        await mockAPICall()

        const parsedCart = await findCart()
        if (parsedCart?.length > 0) {
            tempAllCart = [...parsedCart]
        }
        tempAllCart.push(cart)

        window.localStorage.setItem('cart', JSON.stringify(tempAllCart))
        return tempAllCart
    } catch (error) {
        throw error
    }
}

export async function findCart() {
    try {
        await mockAPICall()

        const storedCart = window.localStorage.getItem("cart")
        const parsedCart = storedCart ? JSON.parse(storedCart) : []

        return parsedCart
    } catch (error) {
        throw error
    }
}