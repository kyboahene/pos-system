export type User = {
    id: string
    username: string
}

export type LoginCredentials = {
    username: string
    password: string
}

export type AuthState = {
    user: User | null
    isAuthenticated: boolean
}

export type Product = {
    id: string
    name: string
    category: string
    description: string
    image: string
    variants: ProductVariant[]
}

export type Products = {
    products: Product[]
}

export type ProductVariant = {
    name: string
    price: string
    size: string
    quantity: number
}

export type Cart = {
    product: Product | null
    status: "Pending" | "Confirmed"
    total?: string
}

export type AllCart = {
    cart: Cart[] | null
    selectedProduct: Product | null
}

export type Order = {
    id: string
    customerName: string
    productDetails: Cart[]
    phoneNumber: string
    PaymentMethod: string
    momoNumber?: string
    deliveryOption: string
    createdAt: Date
    status: string
}

export type OrderStatus = "Pending" | "Confirmed" | "Canceled"

export type Orders = {
    orders: Order[]
}