"use client";
import React, { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/store";
import Icons from "@/components/ui/Icons";
import { SIGNIN } from "@/app/constant";

const formSchema = z.object({
  username: z.string().trim().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().trim().min(2, {
    message: "Password must be at least 8 characters.",
  }),
});

function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { username, isLogin, setUsername, setIsLogin } = useGlobalContext();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //2. Submit Handling
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      setUsername(values.username);
      setIsLogin(true);

      router.push("/home");
    }, 1000);
  }

  useLayoutEffect(() => {
    if (isLogin) {
      router.push("/home");
    }
  }, [isLogin, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} disabled={isLoading} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {SIGNIN}
        </Button>
      </form>
    </Form>
  );
}

export default UserAuthForm;
