/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { z } from "zod";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import FileUploadDropzone from "../file-upload-dropzone";

// types
import { Product } from "@/types";

// shared
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/modules/shared/select";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from "@/modules/shared/form";
import { Input } from "@/modules/shared/input";
import { Button } from "@/modules/shared/button";

// services
import { addProduct } from "@/lib/services/product";

// util
import { getBase64 } from "@/lib/utils";

// store
import { createProduct } from "@/lib/store/slices/product";

const variantSchema = z.object({
  name: z.string(),
  price: z.string(),
  size: z.string(),
  quantity: z.number(),
});

const formSchema = z.object({
  image: z.string(),
  name: z.string().min(3),
  description: z.string(),
  category: z.string(),
  variants: z.array(variantSchema),
});

const CreateProductForm = ({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const [files, setFiles] = useState<File[] | null>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control: form.control,
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: "",
    mutationFn: (data: Product) => addProduct(data),
    onSuccess: (data: Product[]) => {
      dispatch(createProduct(data));
      form.reset();
      setIsOpen(false);
      toast.success("Product created successfully");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const product: Product = {
      id: uuidv4(),
      name: data.name,
      category: data.category,
      description: data.description,
      image: data.image,
      variants: data.variants,
    };

    mutate(product);
  }

  useEffect(() => {
    async function setImage() {
      if (files && files?.length > 0) {
        const base64 = await getBase64(files[0]);
        form.setValue("image", base64);
      } else {
        form.setValue("image", "");
      }
    }

    setImage();
  }, [files]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <div className="flex h-full flex-col gap-6 pt-6 pb-10 md:px-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Product Details</h1>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="font-bold">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="md:w-96">
                  <FileUploadDropzone files={files} setFiles={setFiles} />
                </div>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold flex">
                      <p> Product Name</p>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Pizza"
                        className="border py-3 px-4 md:w-96 rounded-md focus-visible:outline-none focus-visible:border-black"
                      />
                    </FormControl>
                    <span className="text-red-500">
                      {form.formState.errors.name?.message}
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold flex">
                      <p> Category</p>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="md:w-96 py-3 px-4">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="apple">Snack</SelectItem>
                            <SelectItem value="banana">Meal</SelectItem>
                            <SelectItem value="blueberry">Breakfast</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <span className="text-red-500">
                      {form.formState.errors.category?.message}
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-bold flex">
                      <p> Product Description</p>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="border px-4 py-3 rounded-md md:w-96 focus-visible:outline-none focus-visible:border-black"
                        rows={5}
                      ></textarea>
                    </FormControl>
                    <span className="text-red-500">
                      {form.formState.errors.description?.message}
                    </span>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Product variants</h1>
            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name={`variants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold flex">
                          <p> Variant Name</p>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter name"
                            className="border py-3 px-4 rounded-md focus-visible:outline-none focus-visible:border-black"
                          />
                        </FormControl>
                        <span className="text-red-500">
                          {form.formState?.errors?.variants &&
                            form.formState?.errors?.variants[index]?.name
                              ?.message}
                        </span>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold flex">
                          <p> Variant Price</p>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="Enter price"
                            className="border py-3 px-4 rounded-md focus-visible:outline-none focus-visible:border-black"
                          />
                        </FormControl>
                        <span className="text-red-500">
                          {form.formState?.errors?.variants &&
                            form.formState?.errors?.variants[index]?.price
                              ?.message}
                        </span>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold flex">
                          <p> Variant Size</p>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter size"
                            className="border py-3 px-4 rounded-md focus-visible:outline-none focus-visible:border-black"
                          />
                        </FormControl>
                        <span className="text-red-500">
                          {form.formState?.errors?.variants &&
                            form.formState?.errors?.variants[index]?.size
                              ?.message}
                        </span>
                      </FormItem>
                    )}
                  />
                  <div>
                    <button
                      type="button"
                      className="bg-[#f5f5f5] text-black rounded-md"
                      onClick={() => remove(index)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="flex items-center gap-2 text-green"
                onClick={() =>
                  append({ name: "", price: "", size: "", quantity: 0 })
                }
              >
                <PlusCircle className="h-4 w-4" />
                <p className="font-bold underline">Add another variant</p>
              </button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 py-6 px-4 border-t">
          <div className="flex justify-end items-center">
            <Button
              disabled={isLoading}
              type="submit"
              className=" disabled:text-[#16CB7F] disabled:bg-green/90"
            >
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductForm;
