"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputPhone } from "@/app/register/components/input-phone";
import { extractPhoneNumber, formatPhone } from "@/utils/formatPhone";

export function LoginEmail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [country, setCountry] = useState<string>("+55");
  const [valuePhone, setValuePhone] = useState<string>("");

  // Schema dinâmico baseado no método de login selecionado
  const schema = z.object({
    email: loginMethod === "email"
      ? z.string().email('Digite um email válido').min(5, 'O email é obrigatório')
      : z.string().optional(),
    phone: loginMethod === "phone"
      ? z.string().min(1, 'Telefone é obrigatório')
      : z.string().optional(),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  });

  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  // Reset do formulário quando o método de login mudar
  useEffect(() => {
    reset();
    setError("");
  }, [loginMethod, reset]);

  // Atualiza o valor do telefone no formulário
  useEffect(() => {
    setValue('phone', valuePhone);
  }, [valuePhone, setValue]);

  const handlePhone = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    setValuePhone(formatPhone(onlyNumbers));
  };

  async function onSubmit(data: FormData) {

    try {
      setLoading(true);

      const credentials = {
        ...(loginMethod === "email" ? { email: data.email } : { email: extractPhoneNumber(country + data.phone) }),
        password: data.password,
        // loginMethod, // Adiciona o método de login para o backend saber como processar
        redirect: false,
      };

      const result = await signIn("credentials", credentials);

      if (result?.error) {
        setError(loginMethod === "email"
          ? "Email ou senha inválidos"
          : "Telefone ou senha inválidos");
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
    <div className="border border-gray-400 rounded-lg p-15 space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-125 w-full gap-3 flex-col items-center justify-center text-center"
      >
        <h1 className="text-2xl font-bold mb-8">Faça login para continuar</h1>

        <div className="w-full flex space-x-2">
          <select
            value={loginMethod}
            onChange={(e) => setLoginMethod(e.target.value as "email" | "phone")}
            className="border border-gray-400 rounded-lg p-2"
          >
            <option value="email">Email</option>
            <option value="phone">Telefone</option>
          </select>

          {loginMethod === "email" ? (
            <Input
              type="email"
              placeholder="Seu email"
              {...register('email')}
              className={errors.email ? "border-danger" : ""}
            />
          ) : (
            <InputPhone
              selectCountry={country}
              onChangeCountry={setCountry}
              phone={valuePhone}
              setPhone={handlePhone}
              className={errors.phone ? "border-danger" : ""}
            />
          )}
        </div>

        {loginMethod === "email" && errors.email &&
          <p className="text-danger w-full text-left">{errors.email.message}</p>
        }

        {loginMethod === "phone" && errors.phone &&
          <p className="text-danger w-full text-left">{errors.phone.message}</p>
        }

        <InputPassword
          placeholder="Senha"
          {...register('password')}
          className={errors.password ? "border-danger" : ""}
        />

        {errors.password &&
          <p className="text-danger w-full text-left">{errors.password.message}</p>
        }

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        {error && <p className="text-danger">{error}</p>}

        <div className="w-full flex items-center gap-3 my-2">
          <hr className="border border-gray-300 w-full" />
          <span>ou</span>
          <hr className="border border-gray-300 w-full" />
        </div>

      </form>
      <GoogleLoginButton name="Entrar com Google" />
      <p className="text-center">
        Não tem uma conta?{' '}
        <Link href="/register" className="text-primary hover:text-hover">
          Cadastre-se.
        </Link>
      </p>
    </div>
  );
}