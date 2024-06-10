import { Product } from "@/types";
import { mockAPICall } from "../utils";


export async function addProduct(data: Product) {
    let tempProducts: Product[] = []

    try {
        await mockAPICall()

        const parsedProducts = await findProducts()
        if (parsedProducts?.length > 0) {
            tempProducts = [...parsedProducts]
        }
        tempProducts.push(data)

        window.localStorage.setItem('products', JSON.stringify(tempProducts))
        return tempProducts
    } catch (error) {
        throw error
    }
}

export async function findProducts() {
    try {
        await mockAPICall()

        const storedProducts = window.localStorage.getItem("products")
        const parsedProducts = storedProducts ? JSON.parse(storedProducts) : []

        return parsedProducts
    } catch (error) {
        throw error
    }
}

export async function removeProduct(productId: string) {
    try {
        await mockAPICall()

        const products: Product[] = await findProducts()
        const filteredProducts = products.filter(product => product.id !== productId)
        return filteredProducts
    } catch (error) {
        throw error
    }
}