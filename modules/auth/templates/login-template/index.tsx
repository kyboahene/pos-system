import React from "react";
import LoginForm from "../../components/login-form";

const LoginTemplate = () => {
  return (
    <div className="flex h-screen">
      <div className="relative flex-1 bg-[url('/images/eating.jpg')] max-sm:hidden md:block bg-cover bg-center">
        <div className="absolute size-full top-0 left-0 bg-[rgba(0,0,0,0.6)]"></div>
        <div className="flex justify-center items-center size-full">
          <div className="relative size-full flex items-center w-4/5">
            <h1 className="font-carena text-green font-bold text-[80px] z-30">
              Syst
            </h1>
          </div>
        </div>
      </div>
      <div className="flex-1 border flex flex-col justify-center items-center py-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginTemplate;
