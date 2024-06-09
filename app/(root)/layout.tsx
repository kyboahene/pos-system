import React from "react";
import DashboardLayoutTemplate from "@/modules/layout/templates/dashboard-layout-template";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return <DashboardLayoutTemplate>{children}</DashboardLayoutTemplate>;
};

export default DashboardLayout;
