import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

// service
import { loginUser } from "../services/auth";

// store
import { setUser } from "../store/slices/user";

// types
import { LoginCredentials, User } from "@/types";

// hooks
import useLocalStorage from "./use-local-storage";

const useLogin = (onSuccessCallback: () => void) => {
  const dispatch = useDispatch();
  const { setItem } = useLocalStorage("user");

  return useMutation({
    mutationKey: "",
    mutationFn: ({ username, password }: LoginCredentials) =>
      loginUser(username, password),
    onSuccess: (user: User) => {
      dispatch(setUser(user));

      const userDataToStore = {
        user,
        isUserAuthenticated: true,
      };
      setItem(userDataToStore);
      onSuccessCallback();
    },
  });
};

export default useLogin;
