"use client";

import ReportPageTemplate from "@/modules/reports/templates/report-page-template";
import withAuth from "@/modules/shared/with-auth";
import React from "react";

const Report = () => {
  return <ReportPageTemplate />;
};

export default withAuth(Report);
