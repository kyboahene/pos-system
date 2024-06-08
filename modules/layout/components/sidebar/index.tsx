"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// utils
import { cn } from "@/lib/utils";

// constants
import { sidebarLinks } from "@/constants";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-white p-6 pt-28 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link, index) => {
          const isActive = pathName === link.route;

          return (
            <Link
              href={link.route}
              key={index}
              className={cn("p-4 rounded-lg justify-start", {
                "bg-blue-1": isActive,
              })}
            >
              <div className="flex gap-4 items-center">
                {<link.icon />}
                <span>{link.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
