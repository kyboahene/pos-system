import { Button } from "@/modules/shared/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/modules/shared/sheet";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const CreateProductDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer" asChild>
        <Button variant="outline" className="py-4 px-6">
          Add Product
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-none bg-white md:min-w-[755px] border-2 border-red-500"
      >
        <SheetHeader className="border-b pb-2">
          <SheetTitle className="font-bold text-2xl">Add to Cart</SheetTitle>
        </SheetHeader>
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <form className="h-full flex flex-col justify-between">
              <div className="flex h-full flex-col">
                <div className="flex gap-6 py-6 border-b">
                  <div className="relative h-[129px] w-[203px] rounded-lg overflow-hidden">
                    <Image
                      alt="product"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPsXLK8HgAF5wJVnJv1MQAAAABJRU5ErkJggg=="
                      src="/images/pizza.jpg"
                      objectFit="cover"
                      fill
                    />
                  </div>
                  <div className="flex flex-col gap-4 text-xl">
                    <p className="">4 Meat Pizza</p>
                    <p className="font-bold">GHS 50</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 py-6">
                  <h5 className="font-bold text-[22px]">Select</h5>

                  <div className="flex flex-col gap-4 text-[18px]">
                    <div className="flex items-center">
                      <p className="flex-1">Small</p>
                      <p className="flex-1 text-center">GHS 400</p>
                      <div className="flex-1 flex justify-end items-center gap-3">
                        <div className="rounded-2xl border bg-[#DFDFDF] py-1 px-2">
                          <Plus className="w-4 h-4 cursor-pointer" />
                        </div>
                        <span className="rounded-lg px-2 border">0</span>
                        <div className="rounded-2xl border bg-[#DFDFDF] py-1 px-2">
                          <Minus className="w-4 h-4 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-6 border-t">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p>Total</p>
                    <span className="font-bold text-3xl">0</span>
                  </div>

                  <Button>Add to Cart</Button>
                </div>
              </div>
            </form>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateProductDrawer;
