import GoogleLoginButton from "@/components/GoogleLoginButton";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Input, InputPassword } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// const passwordSchema = z
//   .string()
//   .min(8, "A senha deve ter no mínimo 8 caracteres")
//   .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
//   .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
//   .regex(/[0-9]/, "A senha deve conter pelo menos um número")
//   .regex(/[\W_]/, "A senha deve conter pelo menos um caractere especial");

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center p-2">
      <main className="max-w-125 md:max-w-230 w-full flex flex-col items-center justify-center gap-6 px-10 py-10 text-center border border-gray-400 rounded-lg">
        <h1 className="text-2xl font-bold">Faça o cadastro</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 my-6">
          <Input type="text" placeholder="Nome completo" />
          <Input type="text" placeholder="CPF ou CNPJ" />
          <Input type="text" placeholder="Genero" />
          <Input type="text" placeholder="Data de nascimenmto" />
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="Numero de Celular" />
          <InputPassword placeholder="Senha" />
          <InputPassword placeholder="Confirmar senha" />
        </div>
        <div className="space-y-4 w-full">
          <div className="flex items-center  gap-2">
            <input type="checkbox" className="p-2 appearance-none border border-primary checked:bg-primary checked:border-gray-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain cursor-pointer" />
            <p className="text-sm">Quero receber ofertas e novidades por e-mail, SMS, WhatsApp ou mensagens nos App's POWERGADGEt!</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="p-2 appearance-none border border-primary checked:bg-primary checked:border-gray-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain cursor-pointer" />
            <p className="text-sm">Li e estou de acordo com as <Link href="/" className="text-primary">políticas da empresa e políticas de privacidade</Link>.</p>
          </div>
        </div>
        <Button>
          Entrar
        </Button>
        <div className="w-full flex items-center gap-3">
          <hr className="border border-gray-300 w-full" />
          <span>ou</span>
          <hr className="border border-gray-300 w-full" />
        </div>
        <GoogleLoginButton name="Cadastrar-se com Google" />
        <p className="text-center">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary hover:text-hover">
            Conecte-se.
          </Link>
        </p>
      </main>
    </div>
  );
}