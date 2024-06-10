"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// shared
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/modules/shared/dropdown-menu";

// store
import { logOut } from "@/lib/store/slices/user";
import { getUser } from "@/lib/store/selectors/user";


import useLocalStorage from "@/lib/hooks/use-local-storage";

const UserDetailsDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { removeItem } = useLocalStorage("user");

  function logout() {
    removeItem();
    dispatch(logOut());
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <div className="flex items-center">
        <DropdownMenuTrigger className="cursor-pointer">
          <div className="relative flex items-center">
            <div className="rounded-full bg-[#FFDEB6] p-2">
              <User className="h-4 w-4" />
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end" className="bg-white py-6">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span className="text-bl">{user?.username}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDetailsDropdown;
