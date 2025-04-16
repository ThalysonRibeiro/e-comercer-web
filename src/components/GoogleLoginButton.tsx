"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton({ name }: { name: string }) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer"
    >
      <FcGoogle className="h-5 w-5" />
      <span className="text-gray-100">{name}</span>
    </button>
  );
}