import { User } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { mockAPICall } from "../utils";


export const loginUser = async (username: string, password: string) => {
    try {
        await mockAPICall()
        if (username !== "kyboahene")
            throw new Error("Username does not exist")

        if (password !== "password")
            throw new Error("Incorrect password")

        const user: User = {
            id: uuidv4(),
            username,
        }

        return user
    } catch (error) {
        throw error
    }
}