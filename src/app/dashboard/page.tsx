import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserInfo from "@/components/UserInfo";
import { CreateProduct } from "@/components/test-crfeate-products";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="mb-4">Bem-vindo, {session.user?.name || "Usuário"}!</p>
        <UserInfo />
        <div className="p-4 bg-gray-100 rounded-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Detalhes da sessão:</h2>
          <pre className="text-left overflow-auto max-w-md">
            {JSON.stringify(
              {
                user: session.user,
                accessToken: session.accessToken ? "••••••" : null
              },
              null,
              2
            )}
          </pre>
        </div>
        <CreateProduct />
      </main>
    </div>
  );
}