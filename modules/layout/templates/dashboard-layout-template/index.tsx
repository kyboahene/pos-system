import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayoutTemplate = ({ children }: Props) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-40 max-md:pb-14">
          <div className="w-full">
            <div className="size-full flex flex-col gap-10">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayoutTemplate;
