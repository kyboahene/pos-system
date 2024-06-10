import { toast } from "sonner";
import Image from "next/image";
import { X } from "lucide-react";
import { useMutation } from "react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// types
import { Cart } from "@/types";

// shared
import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/modules/shared/sheet";
import { Button } from "@/modules/shared/button";

// services
import { createCart } from "@/lib/services/cart";

//store
import { addCart } from "@/lib/store/slices/cart";
import { getSelectedProduct } from "@/lib/store/selectors/cart";

// component
import { VariantComponent } from "../variant-component";

type AddToCartDrawerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const AddToCartDrawer = ({ isOpen, setIsOpen }: AddToCartDrawerProps) => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(getSelectedProduct);

  const [totalPrice, setTotalPrice] = useState(0);
  const [variants, setVariants] = useState(selectedProduct?.variants);

  function updateQuantity(name: string, size: string, quantity: number) {
    const data = variants
      ? variants.map((variant) =>
          variant.name === name && variant.size === size
            ? { ...variant, quantity }
            : variant
        )
      : [];

    setVariants(data);
  }

  const { mutate, isLoading } = useMutation(
    "add-cart",
    (data: Cart) => createCart(data),
    {
      onSuccess: (data: Cart[]) => {
        dispatch(addCart(data));
        setIsOpen(false);
        toast.success("Product added to cart successfully");
      },
    }
  );

  async function addToCart() {
    const cartData: Cart = {
      product: selectedProduct,
      total: `${totalPrice}`,
      status: "Confirmed",
    };

    mutate(cartData);
  }

  function handleDrawerClose() {
    setIsOpen(false);
    setTotalPrice(0);
  }

  useEffect(() => {
    if (selectedProduct?.variants) {
      setVariants(selectedProduct.variants);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (variants && variants?.length > 0) {
      const total = variants.reduce(
        (sum, variant) =>
          sum + parseInt(variant.price) * (variant?.quantity ?? 0),
        0
      );
      setTotalPrice(total);
    }
  }, [variants]);

  return (
    <Sheet open={isOpen}>
      <Button
        className="px-4 py-3 text-sm md:py-4 md:px-6"
        onClick={() => setIsOpen(true)}
      >
        Add to Cart
      </Button>
      <SheetContent
        side="right"
        className="border-none bg-white w-[90%] md:min-w-[755px] border-2 border-red-500"
      >
        <SheetHeader className="border-b pb-2">
          <SheetTitle className="font-bold flex justify-between md:pl-4 md:pr-2">
            <h1 className="md:text-2xl">Add to Cart</h1>
            <button
              className="flex items-center gap-2 z-50 bg-white"
              onClick={() => handleDrawerClose()}
            >
              <X />
              <span className="font-bold">Close</span>
            </button>
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <div className="h-full flex flex-col justify-between">
              {selectedProduct ? (
                <div className="flex h-full flex-col overflow-y-auto">
                  <div className="flex gap-6 py-6 border-b">
                    <div className="relative h-[129px] w-[203px] rounded-lg overflow-hidden">
                      <Image
                        alt="product"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPsXLK8HgAF5wJVnJv1MQAAAABJRU5ErkJggg=="
                        src={selectedProduct?.image ?? ""}
                        objectFit="cover"
                        fill
                      />
                    </div>
                    <div className="flex flex-col gap-4 text-xl">
                      <p className="">{selectedProduct.name}</p>
                      <p className="font-bold">GHS 50</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 py-6">
                    <h5 className="font-bold text-[22px]">Select</h5>

                    <div className="flex flex-col gap-4 text-[18px]">
                      {selectedProduct.variants.map((variant, index) => (
                        <VariantComponent
                          updateQuantity={updateQuantity}
                          variant={variant}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="size-full flex justify-center items-center">
                  There are no items in your cart
                </div>
              )}

              <div className="py-6 border-t sticky bottom-0">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p>Total</p>
                    <span className="font-bold text-3xl">{totalPrice}</span>
                  </div>

                  <Button
                    disabled={isLoading}
                    type="button"
                    className=" disabled:text-[#16CB7F] disabled:bg-green/90"
                    onClick={() => addToCart()}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddToCartDrawer;
