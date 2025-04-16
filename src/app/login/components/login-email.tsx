"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().min(5, 'O email ou celular é obrigatório'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

type FormData = z.infer<typeof schema>;

interface SiginInProps {
  email: string;
  password: string;
}

export function LoginEmail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(data: SiginInProps) {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
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
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-125 w-full gap-3 flex-col items-center justify-center text-center"
      >
        <h1 className="text-2xl font-bold mb-8">Faça login para continuar</h1>

        <Input
          type="text"
          placeholder="Email ou Celular"
          {...register('email')}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}

        <InputPassword
          placeholder="Senha"
          {...register('password')}
        />
        {errors.email && <p className="text-danger">{errors.password?.message}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        {error && <p className="text-danger">{error}</p>}

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