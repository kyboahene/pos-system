import { RootState } from ".."

export const getUser = (state: RootState) => state.user
export const getUserAuthenticationStatus = (state: RootState) => state.user.isAuthenticated
