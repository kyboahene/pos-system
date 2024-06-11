"use client";

import React from "react";

// components
import withAuth from "@/modules/shared/with-auth";
import LoginTemplate from "@/modules/auth/templates/login-template";

const Login = () => {
  return <LoginTemplate />;
};

export default withAuth(Login, true);
