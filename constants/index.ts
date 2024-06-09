import { BarChart, GalleryVerticalEnd, Home, ShoppingCart } from "lucide-react";

export const sidebarLinks = [
    {
        label: "Home",
        route: "/",
        icon: Home
    },
    {
        label: "Products",
        route: "/product-history",
        icon: GalleryVerticalEnd
    },
    {
        label: "Order",
        route: "/orders",
        icon: ShoppingCart
    },
    {
        label: "Report",
        route: "/report",
        icon: BarChart
    }
]