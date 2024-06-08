import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/auth";
import { setUser } from "../store/slices/user";
import { LoginCredentials, User } from "@/types";
import useLocalStorage from "./use-local-storage";
import { getUserAuthenticationStatus } from "../store/selectors/user";

const useLogin = () => {
  const dispatch = useDispatch();
  const { setItem } = useLocalStorage("user");
  const isUserAuthenticated = useSelector(getUserAuthenticationStatus);

  return useMutation({
    mutationKey: "",
    mutationFn: ({ username, password }: LoginCredentials) =>
      loginUser(username, password),
    onSuccess: (user: User) => {
      dispatch(setUser(user));

      const userDataToStore = {
        user,
        isUserAuthenticated,
      };
      setItem(userDataToStore);
      // onSuccessCallback();
    },
  });
};

export default useLogin;
