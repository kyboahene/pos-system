/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import React, { ComponentType, useEffect, useState } from "react";

// store
import { addCart } from "@/lib/store/slices/cart";
import { setUser } from "@/lib/store/slices/user";
import { addOrder } from "@/lib/store/slices/order";
import { createProduct } from "@/lib/store/slices/product";

// hooks
import useLocalStorage from "@/lib/hooks/use-local-storage";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  isPublic: boolean = false
): React.FC<P> => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { getItem: getUser } = useLocalStorage("user");
    const { getItem: getCart } = useLocalStorage("cart");
    const { getItem: getOrders } = useLocalStorage("orders");
    const { getItem: getProducts } = useLocalStorage("products");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const user = getUser();
      const cart = getCart();
      const orders = getOrders();
      const products = getProducts();

      if (user?.isUserAuthenticated) {
        dispatch(setUser(user));
        dispatch(addCart(cart));
        dispatch(addOrder(orders));
        dispatch(createProduct(products));

        if (isPublic) {
          router.push("/");
        } else {
          setLoading(false);
        }
      } else if (!isPublic) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [router, dispatch]);

    if (loading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="spinner"></span>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
