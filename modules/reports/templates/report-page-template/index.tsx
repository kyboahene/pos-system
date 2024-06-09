import React from "react";
import ReportCard from "../../components/report-card";
import {
  BanknoteIcon,
  ShoppingBasket,
  ShoppingBasketIcon,
  Users,
  UsersIcon,
} from "lucide-react";
import ProductSalesChart from "../../components/product-sales-chart";

const ReportPageTemplate = () => {
  return (
    <section className="flex size-full flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[40px] font-bold">Report</h1>
      </div>

      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-4 gap-6">
          <ReportCard
            icon={ShoppingBasketIcon}
            title="Total Orders"
            number={40}
          />
          <ReportCard icon={UsersIcon} title="Total Customers" number={12} />
          <ReportCard
            icon={BanknoteIcon}
            title="Successful orders"
            number={6}
          />
          <ReportCard icon={BanknoteIcon} title="Sales" number={4230} />
        </div>

        <div className="w-full">
          <ProductSalesChart />
        </div>
      </div>
    </section>
  );
};

export default ReportPageTemplate;
