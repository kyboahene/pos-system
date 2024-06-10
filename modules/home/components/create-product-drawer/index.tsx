"use client";

import { Button } from "@/modules/shared/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/modules/shared/sheet";
import { MoveLeft } from "lucide-react";
import React from "react";

import CreateProductForm from "../create-product-form";

type CreateProductDrawerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const CreateProductDrawer = ({
  setIsOpen,
  isOpen,
}: CreateProductDrawerProps) => {
  return (
    <Sheet open={isOpen}>
      <Button
        variant="outline"
        className="px-4 py-3 text-sm md:py-4 md:px-6"
        onClick={() => setIsOpen(true)}
      >
        Add Product
      </Button>
      <SheetContent
        side="right"
        onInteractOutside={(e) => e.preventDefault()}
        className="border-none bg-white w-[90%] md:min-w-[755px] border-2 border-red-500"
      >
        <SheetHeader className="border-b pb-2">
          <SheetTitle className="font-bold flex justify-between md:pl-4 md:pr-2">
            <h1 className="md:text-2xl">Add Product</h1>
            <button
              className="flex items-center gap-3 z-50 bg-white"
              onClick={() => setIsOpen(false)}
            >
              <MoveLeft />
              <span className="font-bold">Back</span>
            </button>
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <CreateProductForm setIsOpen={setIsOpen} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateProductDrawer;
