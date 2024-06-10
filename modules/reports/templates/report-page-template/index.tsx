import React from "react";
import { UsersIcon, BanknoteIcon, ShoppingBasketIcon } from "lucide-react";

// hooks
import useReport from "@/lib/hooks/use-report";

// component
import ReportCard from "../../components/report-card";
import ProductSalesChart from "../../components/product-sales-chart";

const ReportPageTemplate = () => {
  const { totalCustomers, totalOrders, successfulOrders, sales } = useReport();

  return (
    <section className="flex size-full flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-[40px] font-bold">Report</h1>
      </div>

      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReportCard
            icon={ShoppingBasketIcon}
            title="Total Orders"
            number={totalOrders}
          />
          <ReportCard
            icon={UsersIcon}
            title="Total Customers"
            number={totalCustomers}
          />
          <ReportCard
            icon={BanknoteIcon}
            title="Successful orders"
            number={successfulOrders}
          />
          <ReportCard icon={BanknoteIcon} title="Sales" number={sales} />
        </div>

        <div className="w-full h-[400px] bg-white md:px-4 py-6 rounded-lg">
          <ProductSalesChart />
        </div>
      </div>
    </section>
  );
};

export default ReportPageTemplate;
