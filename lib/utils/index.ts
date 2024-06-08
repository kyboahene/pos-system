import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const mockAPICall = async () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
};

export const parseErrorMessage = async (errMessage: string, key: string) => {
    return errMessage ? errMessage.includes(key) : ''
}