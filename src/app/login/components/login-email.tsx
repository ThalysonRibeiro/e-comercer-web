"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginEmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validação do lado do cliente
    if (!email || !password) {
      setError("Email e senha são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Enviando credenciais:", { email, password }); // Log para debug

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Resultado do login:", result); // Log para debug

      if (result?.error) {
        setError("Email ou senha inválidos");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao tentar login:", error);
      setError("Ocorreu um erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-gray-400 rounded-lg p-18 space-y-4">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-125 w-full gap-6 flex-col items-center justify-center text-center"
      >
        <h1 className="text-2xl font-bold mb-8">Faça login para continuar</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Input
          type="text"
          placeholder="Email ou Celular"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Senha"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <div className="w-full flex items-center gap-3">
          <hr className="border border-gray-300 w-full" />
          <span>ou</span>
          <hr className="border border-gray-300 w-full" />
        </div>

      </form>
      <GoogleLoginButton name="Entrar com Google" />
      <p className="text-center">
        Não tem uma conta? concidere{' '}
        <Link href="/register" className="text-primary hover:text-hover">
          Cadastre-se.
        </Link>
      </p>
    </div>
  );
}