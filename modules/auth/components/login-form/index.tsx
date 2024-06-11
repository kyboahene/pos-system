"use client";

import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

// hooka
import useLogin from "@/lib/hooks/use-login";

// modules
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/modules/shared/form";
import { Input } from "@/modules/shared/input";
import { Button } from "@/modules/shared/button";

// utils
import { parseErrorMessage } from "../../../../lib/utils";

const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(3),
});

const LoginForm = () => {
  const router = useRouter();

  const mutation = useLogin(() => {
    router.push("/");
  });

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "kyboahene",
      password: "password",
    },
  });

  function login(data: z.infer<typeof LoginFormSchema>) {
    mutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-12 w-5/6 md:w-4/6">
      <h1 className="font-semibold text-4xl">Log in to Syst</h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(login)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <label className="font-bold flex justify-between items-center">
                  <p> Username</p>
                  <p className="text-red-500">
                    {`${parseErrorMessage(
                      mutation?.error as string,
                      "Username"
                    )}` ?? form.formState.errors.username}
                  </p>
                </label>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-b border-t-0 px-3 py-2 text-2xl bg-inherit focus-visible:outline-none focus-visible:border-black"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold flex justify-between items-center">
                  <label>Password</label>

                  <p className="text-red-500">
                    {`${parseErrorMessage(
                      mutation?.error as string,
                      "password"
                    )}` ?? form.formState.errors.password}
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border-b border-t-0 px-3 py-2 text-2xl bg-inherit focus-visible:outline-none focus-visible:border-black"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <Button
              disabled={mutation.isLoading}
              type="submit"
              className="w-full font-bold text-2xl disabled:text-[#16CB7F] disabled:bg-green/100"
            >
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
