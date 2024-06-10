import { z } from "zod";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

// types
import { Order } from "@/types";

// services
import { createOrder } from "@/lib/services/order";

// store
import { addOrder } from "@/lib/store/slices/order";
import { getCart } from "@/lib/store/selectors/cart";

// hooks
import useLocalStorage from "@/lib/hooks/use-local-storage";

// shared
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/modules/shared/form";
import { Input } from "@/modules/shared/input";
import { Button } from "@/modules/shared/button";
import { RadioGroup, RadioGroupItem } from "@/modules/shared/radio-group";

type CheckoutFormProps = {
  setIsOpen: (value: boolean) => void;
};

const formSchema = z.object({
  name: z.string().min(3),
  phoneNumber: z.string().max(10),
  paymentMethod: z.string(),
  isMomoSameAsPhoneNumber: z.string(),
  momoNumber: z.string().optional(),
  delivery: z.string(),
  location: z.string(),
});

const CheckoutForm = ({ setIsOpen }: CheckoutFormProps) => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const { removeItem } = useLocalStorage("cart");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "Circle",
    },
  });
  const isMomoSameAsPhoneNumber = form.watch("isMomoSameAsPhoneNumber");

  const { mutate, isLoading } = useMutation({
    mutationKey: "",
    mutationFn: (data: Order) => createOrder(data),
    onSuccess: (data: Order[]) => {
      dispatch(addOrder(data));
      form.reset();
      setIsOpen(false);
      removeItem();
      toast.success("Order made successfully");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const order: Order = {
      id: uuidv4(),
      customerName: data.name,
      PaymentMethod: data.paymentMethod,
      deliveryOption: data.delivery,
      phoneNumber: data.phoneNumber,
      momoNumber: data.momoNumber,
      createdAt: new Date(),
      status: "Pending",
      productDetails: cart.cart !== null ? cart.cart : [],
    };
    mutate(order);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <div className="flex h-full flex-col gap-6 pt-6 pb-10 px-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Payment Details</h1>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold flex">
                      <p> Name</p>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Yaw Kyei Boahene"
                        className="border py-3 px-4 w-96 rounded-md focus-visible:outline-none focus-visible:border-black"
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold flex">
                      <p> Phone Number</p>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        placeholder="050 451 2117"
                        className="border py-3 px-4 w-96 rounded-md focus-visible:outline-none focus-visible:border-black"
                      />
                    </FormControl>
                    <span className="text-red-500">
                      {form.formState.errors.phoneNumber?.message}
                    </span>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Select Payment Method</h1>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Momo" />
                          </FormControl>
                          <FormLabel className="font-normal">Momo</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Card" />
                          </FormControl>
                          <FormLabel className="font-normal">Card</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Cash on delivery" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Cash on delivery
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <span className="text-red-500">
                      {form.formState.errors.paymentMethod?.message}
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isMomoSameAsPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Is your Momo number the same as your phone number?
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="momoNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold flex">
                      <p> Phone Number</p>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        disabled={isMomoSameAsPhoneNumber === "true"}
                        placeholder="050 451 2117"
                        className="border py-3 px-4 w-96 rounded-md focus-visible:outline-none focus-visible:border-black"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Delivery Details</h1>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="delivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold flex">
                      Select delivery option
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-4"
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              value="Delivery"
                              className="peer hidden"
                            />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border px-4 py-2 peer-aria-checked:bg-green peer-aria-checked:text-white">
                            Delivery
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              value="Pick up"
                              className="peer hidden"
                            />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border px-4 py-2 peer-aria-checked:bg-green peer-aria-checked:text-white">
                            Pick Up
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <span className="text-red-500">
                      {form.formState.errors.delivery?.message}
                    </span>
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center p-4  rounded-lg bg-[#FFDEB6]">
                <div className="flex flex-col">
                  <span>Delivery location</span>
                  <p className="font-bold text-xl">Circle</p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="underline">Change</button>
                  <MapPin />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 py-6 px-4 border-t">
          <Button
            className="w-full disabled:text-[#16CB7F] disabled:bg-green/90"
            disabled={isLoading}
            type="submit"
          >
            Continue to Pay
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
