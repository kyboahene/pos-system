import React, { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { Cart, Order, OrderStatus, Product } from "@/types";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/modules/shared/table";

// services
import { removeOrder, updateOrderStatus } from "@/lib/services/order";

// store
import { addOrder } from "@/lib/store/slices/order";
import { getOrders } from "@/lib/store/selectors/order";

// hooks
import useLocalStorage from "@/lib/hooks/use-local-storage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/shared/select";
import { cn, getNameOfProductsOrdered, getTotalPricePaid } from "@/lib/utils";

type OrdersTableProps = {
  orders: Order[];
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const dispatch = useDispatch();

  const { setItem } = useLocalStorage("orders");

  const { mutate, isLoading } = useMutation(
    "delete-order",
    (orderId: string) => removeOrder(orderId),
    {
      onSuccess: (data: Order[]) => {
        setItem(data);
        dispatch(addOrder(data));
        toast.success("Order deleted successfully");
      },
    }
  );

  const { mutate: updateStatus, isLoading: updateIsLoading } = useMutation(
    "update-order",
    ({ orderId, status }: { orderId: string; status: string }) =>
      updateOrderStatus(orderId, status),
    {
      onSuccess: (data: Order[]) => {
        setItem(data);
        dispatch(addOrder(data));
        toast.success("Order status updated successfully successfully");
      },
    }
  );

  function handleStatusChange(value: string, orderId: string) {
    updateStatus({ orderId, status: value });
  }

  function handleDelete(orderId: string) {
    mutate(orderId);
  }

  return (
    <section className="bg-white">
      <div className=" max-sm:max-w-[370px] overflow-x-auto">
        <Table className="min-w-full text-xl">
          <TableHeader className="bg-[#EFEFEF]">
            <TableRow className="!border-b-0 font-bold">
              <TableHead>Customer</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative border-3 border-red-400">
            <div className="top-0 right-0 size-full bg-[rgba(0,0,0,0.5)] z-30"></div>
            {isLoading || updateIsLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading…
                </TableCell>
              </TableRow>
            ) : orders !== undefined && orders.length > 0 ? (
              orders?.map((order) => {
                return (
                  <TableRow key={order.id}>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      {getNameOfProductsOrdered(order.productDetails)}
                    </TableCell>
                    <TableCell>
                      {getTotalPricePaid(order.productDetails)}
                    </TableCell>
                    <TableCell>{order.deliveryOption}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Select
                        defaultValue={order.status}
                        onValueChange={(value) =>
                          handleStatusChange(value, order.id)
                        }
                      >
                        <SelectTrigger
                          className={cn("py-3 px-4", {
                            " bg-[#39FF18]": order.status === "Confirmed",
                            "bg-[#FFE818]": order.status === "Pending",
                            "bg-[#FF1818]": order.status === "Canceled",
                          })}
                        >
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Canceled">Canceled</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      {isLoading ? (
                        "..."
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="text-red-500" />
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  You have not made any order(s) yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default OrdersTable;
