import { Cart } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export async function mockAPICall() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
};

export function parseErrorMessage(errMessage: string, key: string) {
    if (!errMessage)
        return ''

    return errMessage.includes(key) ? errMessage : ''
}

export function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}
export function getNameOfProductsOrdered(products: Cart[]) {
    return products.map((product) => `${product.product?.name}, `);
}

export function getTotalPricePaid(products: Cart[]) {
    return products.reduce(
        (sum, product) => sum + parseInt(product.total ?? ""),
        0
    );
}