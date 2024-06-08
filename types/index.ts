export type User = {
    name: string
    isAuthenticated: boolean
}

export type Product = {
    id: string
    name: string
    category: string
    description: string
    image: string
    variant: ProductVariant[]
}

export type Products = {
    products: Product[]
}

export type ProductVariant = {
    name: string
    price: string
    size: "S" | "M" | "L"
}

export type Order = {
    id: string
    customerName: string
    phoneNumber: string
    PaymentMethod: "Momo" | "Card" | "Cash on delivery"
    momoNumber?: string
    deliveryOption: "Delivery" | "Pick up"
    createdAt: Date
}

export type Orders = {
    orders: Order[]
}