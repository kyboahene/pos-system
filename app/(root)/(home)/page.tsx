"use client";

import HomeTemplate from "@/modules/home/templates/home-template";
import withAuth from "@/modules/shared/with-auth";
import React from "react";

const Home = () => {
  return <HomeTemplate />;
};

export default withAuth(Home);
