import React from "react";
import OrdersTable from "../../components/orders-table";

const OrdersPageTemplate = () => {
  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-[40px] font-bold">Orders</h1>

      <OrdersTable />
    </section>
  );
};

export default OrdersPageTemplate;
