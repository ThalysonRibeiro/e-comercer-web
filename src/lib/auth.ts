import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ajuste este caminho para onde seu authOptions está definido

export async function getServerAuthSession() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Error in getServerAuthSession:", error);
    return null;
  }
}