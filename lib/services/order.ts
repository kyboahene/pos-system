import { Order } from "@/types";
import { mockAPICall } from "../utils";


export async function createOrder(data: Order) {
    let tempOrders: Order[] = []

    try {
        await mockAPICall()

        const parsedOrders = await findOrders()
        if (parsedOrders?.length > 0) {
            tempOrders = [...parsedOrders]
        }
        tempOrders.push(data)

        window.localStorage.setItem('orders', JSON.stringify(tempOrders))
        return tempOrders
    } catch (error) {
        throw error
    }
}

export async function findOrders() {
    try {
        await mockAPICall()

        const storedOrders = window.localStorage.getItem("orders")
        const parsedOrders = storedOrders ? JSON.parse(storedOrders) : []

        return parsedOrders
    } catch (error) {
        throw error
    }
}

export async function removeOrder(orderId: string) {
    try {
        await mockAPICall()

        const orders: Order[] = await findOrders()
        const filteredOrders = orders.filter(order => order.id !== orderId)
        return filteredOrders
    } catch (error) {
        throw error
    }
}

export async function updateOrderStatus(orderId: string, status: string) {
    try {
        await mockAPICall()

        let orders: Order[] = await findOrders()
        let orderToBeUpdatedIndex = orders.findIndex(order => order.id === orderId)

        if (orderToBeUpdatedIndex !== -1) {
            orders[orderToBeUpdatedIndex].status = status
        }

        return orders
    } catch (error) {
        throw error
    }



}

