import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Bem-vindo, {session.user.name}!</p>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn("google")}>Login com Google</button>
    </div>
  );
}
