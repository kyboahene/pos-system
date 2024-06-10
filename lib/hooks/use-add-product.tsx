import { useMutation } from "react-query";
import { addProduct } from "../services/product";
import { Product } from "@/types";
import { useDispatch } from "react-redux";
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
