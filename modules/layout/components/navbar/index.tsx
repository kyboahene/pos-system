import React from "react";
import Link from "next/link";
import { Input } from "@/modules/shared/input";
import { Bell, ShoppingCart, User, UserCircle } from "lucide-react";
import MobileNav from "../mobile-nav";

// components

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 py-4 bg-dark-1 bg-white shadow">
      <div className="flex justify-between px-6 items-center">
        <Link href="/" className="flex items-center gap-3">
          <h1 className="font-carena text-green font-bold text-[40px] z-30">
            Syst
          </h1>
        </Link>

        <div className="max-sm:hidden">
          <Input
            type="search"
            className="rounded-[32px] border py-4 px-6 w-[350px] md:w-96"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-green text-white flex items-center gap-2 py-2 px-4 rounded-[24px]">
            <ShoppingCart />
            <p className="font-bold text-[22px]">0</p>
          </div>

          <Bell />

          <div>
            <div className="rounded-full bg-[#f5f5f5]">
              <User />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
