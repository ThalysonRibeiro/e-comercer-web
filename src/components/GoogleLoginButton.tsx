"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LoadingButton } from "./ui/loadingButton";
import { Flex } from "./ui/flex";

export default function GoogleLoginButton({ name }: { name: string }) {
  const [loading, setLoading] = useState(true);

  function loginGoogle() {
    signIn("google")
    setLoading(false);
  }

  return (
    <button
      onClick={loginGoogle}
      className="w-full flex items-center justify-center gap-2 rounded-md border border-oldPrice bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 cursor-pointer"
    >
      {!loading ?
        <LoadingButton />
        : <Flex className="gap-2.5">
          <FcGoogle className="h-5 w-5" /> <span>{name}</span>
        </Flex>}
    </button>
  );
}
