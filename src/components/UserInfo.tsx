"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Perfil</h2>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sair
        </button>
      </div>

      <div className="space-y-2">
        <p><strong>Nome:</strong> {session.user?.name}</p>
        <p><strong>Email:</strong> {session.user?.email}</p>

        {session.user?.image && (
          <div>
            <p><strong>Foto:</strong></p>
            <img
              src={session.user.image}
              alt="Foto do perfil"
              className="w-20 h-20 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}