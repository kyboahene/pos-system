"use client";

import React from "react";
import { useForm } from "react-hook-form";

// modules
import { Input } from "@/modules/shared/input";
import { Button } from "@/modules/shared/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/lib/hooks/use-login";
import { useRouter } from "next/navigation";
import { parseErrorMessage } from "../../../../lib/utils";

const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const LoginForm = () => {
  const mutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "kyboahene",
      password: "pass@randcard",
    },
  });

  function login(data: z.infer<typeof LoginFormSchema>) {
    console.log(data);

    mutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-12 w-5/6 md:w-4/6">
      <h1 className="font-semibold text-4xl">Log in to Syst</h1>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(login)}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <label>Username</label>
            <p className="text-red-500">
              {parseErrorMessage(mutation.error as string, "username") ??
                errors.username}
            </p>
          </div>
          <Input
            type="text"
            {...register("username")}
            className="border-b border-t-0 px-3 py-2 text-2xl bg-inherit focus-visible:outline-none focus-visible:border-black"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <label>Password</label>

            <p className="text-red-500">
              {parseErrorMessage(mutation.error as string, "password") ??
                errors.password}
            </p>
          </div>
          <Input
            type="password"
            {...register("password")}
            className="border-b border-t-0 px-3 py-2 text-2xl bg-inherit focus-visible:outline-none focus-visible:border-black"
          />
        </div>
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
    </div>
  );
};

export default LoginForm;
