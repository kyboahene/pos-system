"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import React, { useState } from "react";

// shared
import { Input } from "@/modules/shared/input";

// component
import MobileNav from "../mobile-nav";
import CheckoutDrawer from "../checkout-drawer";
import UserDetailsDropdown from "../user-details-dropdown";

const Navbar = () => {
  const [isCheckoutDrawerOpen, setIsCheckoutDrawerOpen] = useState(false);
  return (
    <nav className="fixed w-full z-50 py-4 bg-white shadow">
      <div className="flex justify-between px-6 items-center">
        <Link href="/" className="flex items-center gap-3">
          <h1 className="font-carena text-green font-bold text-[40px] z-30">
            Syst
          </h1>
        </Link>

        <div className="max-sm:hidden">
          <Input
            type="search"
            placeholder="Search"
            className="rounded-[32px] border focus-visible:outline-none focus-visible:border-black py-4 px-6 w-[350px] md:w-96 placeholder:text-center"
          />
        </div>

        <div className="flex items-center gap-4">
          <CheckoutDrawer
            isOpen={isCheckoutDrawerOpen}
            setIsOpen={setIsCheckoutDrawerOpen}
          />
          <Bell />

          <div>
            <UserDetailsDropdown />
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
