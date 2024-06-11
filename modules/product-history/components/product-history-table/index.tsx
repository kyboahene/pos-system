import React from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

// shared
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/modules/shared/table";

// types
import { Product, ProductVariant } from "@/types";

// services
import { removeProduct } from "@/lib/services/product";

// store
import { createProduct } from "@/lib/store/slices/product";
import { getProducts } from "@/lib/store/selectors/product";

// hooks
import useLocalStorage from "@/lib/hooks/use-local-storage";

const ProductHistoryTable = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const { setItem } = useLocalStorage("products");

  const { mutate, isLoading } = useMutation(
    "delete-product",
    (productId: string) => removeProduct(productId),
    {
      onSuccess: (data: Product[]) => {
        setItem(data);
        dispatch(createProduct(data));
        toast.success("Product deleted successfully");
      },
    }
  );

  function getVariantNames(variants: ProductVariant[]) {
    return variants.map((variant) => `${variant.name}, `);
  }

  function handleDelete(productId: string) {
    mutate(productId);
  }

  const exportToExcel = (sheet1: unknown[], date: any) => {
    let firstSheet = utils.json_to_sheet(sheet1, {
      dateNF: "dd/mm/yy",
    });

    let leaveBook = utils.book_new();
    utils.book_append_sheet(leaveBook, firstSheet, "Product History");
    writeFile(leaveBook, `${date}.xls`, {
      cellDates: true,
    });
  };

  return (
    <section className="bg-white">
      <div className=" max-sm:max-w-[370px] overflow-x-auto">
        <Table className="min-w-full text-xl">
          <TableHeader className="bg-[#EFEFEF]">
            <TableRow className="!border-b-0 font-bold">
              <TableHead>Name</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Min. Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <span className="spinner"></span>
                </TableCell>
              </TableRow>
            ) : products !== undefined && products.length > 0 ? (
              products?.map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell className="">{product.name}</TableCell>
                    <TableCell className="">
                      {getVariantNames(product.variants)}
                    </TableCell>
                    <TableCell className="">20</TableCell>
                    <TableCell className="">300</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="text-red-500" />
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  You have not upload any product yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductHistoryTable;
