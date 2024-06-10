import { RootState } from ".."

export const getUser = (state: RootState) => state.user.user
export const getUserAuthenticationStatus = (state: RootState) => state.user.isAuthenticated
