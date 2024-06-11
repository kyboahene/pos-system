import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

// types
import { Product } from "@/types";

// service
import { addProduct } from "../services/product";

// store
import { createProduct } from "../store/slices/product";

const useAddProduct = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: "",
    mutationFn: (data: Product) => addProduct(data),
    onSuccess: (data: Product[]) => {
      dispatch(createProduct(data));
    },
  });
};

export default useAddProduct;
