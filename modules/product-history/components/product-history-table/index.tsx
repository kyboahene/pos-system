import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/shared/table";
import { Trash2 } from "lucide-react";
import React from "react";

const ProductHistoryTable = () => {
  const data: any[] | undefined = [1, 2, 3, 4, 5];
  return (
    <section className="bg-white">
      <div className=" max-sm:max-w-[300px] overflow-x-auto">
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
            {data !== undefined && data.length > 0 ? (
              data?.map((job) => {
                return (
                  <TableRow key={job.id}>
                    <TableCell className="">Fried Rice</TableCell>
                    <TableCell className="">Assorted, Plain</TableCell>
                    <TableCell className="">20</TableCell>
                    <TableCell className="">300</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <span
                        className="cursor-pointer"
                        // onClick={() => handleDelete(job)}
                      >
                        <Trash2 className="text-red-500" />
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <>
                <p className="text-center">
                  You have not upload any product yet.
                </p>
              </>
            )}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default ProductHistoryTable;
