import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/modules/shared/sheet";
import { useSelector } from "react-redux";
import { MoveLeft, ShoppingCart } from "lucide-react";

// component
import CheckoutForm from "../checkout-form";

// store
import { getCart } from "@/lib/store/selectors/cart";

type CreateProductDrawerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const CheckoutDrawer = ({ isOpen, setIsOpen }: CreateProductDrawerProps) => {
  const cart = useSelector(getCart);

  function handleOpen() {
    if (cart.cart && cart.cart?.length > 0) setIsOpen(true);
  }

  return (
    <Sheet open={isOpen}>
      <button
        onClick={() => handleOpen()}
        className="bg-green text-white flex items-center gap-2 px-3 rounded-[24px]"
      >
        <ShoppingCart />
        <p className="font-bold text-[20px]">{cart.cart?.length ?? 0}</p>
      </button>

      <SheetContent
        side="right"
        onInteractOutside={(e) => e.preventDefault()}
        className="border-none bg-white md:min-w-[755px] border-2 border-red-500"
      >
        <SheetHeader className="border-b pb-2">
          <SheetTitle className="font-bold flex justify-between md:pl-4 md:pr-2">
            <h1 className="md:text-2xl">Payment</h1>
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
            <CheckoutForm setIsOpen={setIsOpen} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutDrawer;
