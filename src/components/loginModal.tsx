"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { extractPhoneNumber, formatPhone } from "@/utils/formatPhone";
import { useAppContext } from "@/context/AppContext";
import { X } from "lucide-react";
import { InputPhone } from "./ui/input-phone";
import { LoadingButton } from "./ui/loadingButton";

export function LoginModal() {
  const {
    openCloseModalLogin,
    isOpenModalLogin,
    openModalLoginRef,
    openCloseModalRegister
  } = useAppContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [country, setCountry] = useState<string>("+55");
  const [valuePhone, setValuePhone] = useState<string>("");

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
        redirect: true,
      };

      const result = await signIn("credentials", credentials);
      setLoading(false);
      openCloseModalLogin();

      if (result?.error) {
        setError(loginMethod === "email"
          ? "Email ou senha inválidos"
          : "Telefone ou senha inválidos");
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao tentar login:", error);
      setError("Ocorreu um erro ao fazer login");
    }
  }

  function openRegister() {
    openCloseModalLogin();
    openCloseModalRegister();
  }

  return (
    <>
      {isOpenModalLogin && (
        <div ref={openModalLoginRef} className="min-w-115 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-99 bg-bgCard border border-borderColor rounded-lg p-10 space-y-4">
          <button
            onClick={openCloseModalLogin}
            className="text-primaryColor hover:text-hover absolute top-2 right-2">
            <X />
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-125 w-full gap-3 flex-col items-center justify-center text-center"
          >
            <h1 className="text-2xl font-bold mb-8">Faça login para continuar</h1>

            <div className="w-full flex flex-col space-y-2">
              <select
                value={loginMethod}
                onChange={(e) => setLoginMethod(e.target.value as "email" | "phone")}
                className=" border border-borderColor rounded-lg p-2"
              >
                <option className="bg-bgCard" value="email">Email</option>
                <option className="bg-bgCard" value="phone">Telefone</option>
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
              {loading ? <LoadingButton /> : "Entrar"}
            </Button>

            {error && <p className="text-danger">{error}</p>}

            <div className="w-full flex items-center gap-3 my-2">
              <hr className="border border-borderColor w-full" />
              <span>ou</span>
              <hr className="border border-borderColor w-full" />
            </div>

          </form>
          <GoogleLoginButton name="Entrar com Google" />
          <p className="text-center">
            Não tem uma conta?{' '}
            <button onClick={openRegister} className="text-primaryColor hover:text-hover">
              Cadastre-se.
            </button>
          </p>
        </div>
      )}
    </>
  );
}