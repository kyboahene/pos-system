/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useLocalStorage from "@/lib/hooks/use-local-storage";
import { addCart } from "@/lib/store/slices/cart";
import { addOrder } from "@/lib/store/slices/order";
import { createProduct } from "@/lib/store/slices/product";
import { setUser } from "@/lib/store/slices/user";
import { useRouter } from "next/navigation";
import React, { ComponentType, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Skeleton } from "../skeleton";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { getItem } = useLocalStorage("user");
    const { getItem: getCart } = useLocalStorage("cart");
    const { getItem: getOrders } = useLocalStorage("orders");
    const { getItem: getProducts } = useLocalStorage("products");

    const user = getItem();
    const cart = getCart();
    const orders = getOrders();
    const products = getProducts();

    useEffect(() => {
      if (user) {
        dispatch(setUser(user));
        dispatch(addOrder(orders));
        dispatch(addCart(cart));
        dispatch(createProduct(products));
      }

      if (user === undefined && !user?.isUserAuthenticated) {
        router.push("/login");
      }
    }, [router, user]);

    if (!user)
      return (
        <div className="flex flex-col gap-4 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i, index) => (
              <Skeleton key={index} className="h-44 w-full rounded-lg" />
            ))}
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        </div>
      );

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
