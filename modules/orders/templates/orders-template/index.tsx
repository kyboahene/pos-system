import React from "react";
import { utils, writeFile } from "xlsx";
import { Download } from "lucide-react";
import { useSelector } from "react-redux";

import { Order } from "@/types";
import { Button } from "@/modules/shared/button";
import OrdersTable from "../../components/orders-table";
import { getOrders } from "@/lib/store/selectors/order";
import { getNameOfProductsOrdered, getTotalPricePaid } from "@/lib/utils";

const OrdersPageTemplate = () => {
  const orders = useSelector(getOrders);

  function modifiedForExcelExport(orders: Order[]) {
    return (
      orders &&
      orders.map((order, idx) => ({
        NO: idx + 1,
        CUSTOMER: order.customerName,
        PRODUCTS: getNameOfProductsOrdered(order.productDetails),
        PRICE: getTotalPricePaid(order.productDetails),
        DELIVERY: order.deliveryOption,
        DATE: new Date(order.createdAt).toLocaleDateString(),
        STATUS: order.status,
      }))
    );
  }

  function exportToExcel(sheet: any[]) {
    let ordersSheet = utils.json_to_sheet(sheet, {
      dateNF: "dd/mm/yy",
    });

    let orderBook = utils.book_new();
    utils.book_append_sheet(orderBook, ordersSheet, "Orders");
    writeFile(orderBook, `orders.xls`, {
      cellDates: true,
    });
  }

  const data = modifiedForExcelExport(orders);

  return (
    <section className="flex size-full flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-[40px] font-bold">Orders</h1>

        <div>
          <Button className="flex gap-3" onClick={() => exportToExcel(data)}>
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <OrdersTable orders={orders} />
    </section>
  );
};

export default OrdersPageTemplate;
