
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { FormeRegister } from "./components/formeRegister";


export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }


  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center p-2">
      <FormeRegister />

    </div>
  );
}