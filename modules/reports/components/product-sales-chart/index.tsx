"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

type ProductSalesChartProps = {
  data: {
    name: string;
    sales: string;
  }[];
};

const ProductSalesChart = ({ data }: ProductSalesChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 50,
          left: 20,
          bottom: 5,
        }}
        barGap={2}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="sales" fill="#00881E" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductSalesChart;
