import GoogleLoginButton from "@/components/GoogleLoginButton";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Input, InputPassword } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { LoginEmail } from "./components/login-email";

export default async function Login() {
  const session = await getServerSession(authOptions);


  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center py-10">
      <LoginEmail />
    </div>
  );
}