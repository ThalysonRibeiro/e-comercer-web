import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getServerAuthSession(): Promise<Session | null> {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Error in getServerAuthSession:", error);
    return null;
  }
}