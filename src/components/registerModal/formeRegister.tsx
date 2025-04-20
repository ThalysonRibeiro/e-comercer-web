"use client"
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Input, InputPassword } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useEffect, useState } from 'react';
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCPF } from "@/utils/formatCPF";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { InputPhone } from "./input-phone";
import { extractPhoneNumber, formatPhone } from "@/utils/formatPhone";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { validateCPF } from "@/utils/validateCNPJ";
import { validateCNPJ } from "@/utils/validateCPF";
import { CPForCNPJ } from "./select-cpf-cnpj";
import { Context, ContextType } from "@/context/Context";
import { X } from "lucide-react";
import { LoadingButton } from "../ui/loadingButton";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[\W_]/, "A senha deve conter pelo menos um caractere especial");

type FormData = {
  name: string;
  documentType: 'cpf' | 'cnpj';
  document: string;
  email: string;
  country: string;
  phone: string;
  dateOfBirth: string;
  gender: 'masculino' | 'feminino' | 'outro' | 'prefiro_nao_dizer';
  password: string;
  confirmPassword: string;
  acceptOffers: boolean;
  acceptTerms: boolean;
};

export function FormeRegisterModal() {
  const {
    openCloseModalRegister,
    isOpenModalRegister,
    openModalRegisterRef,
    openCloseModalLogin,
    closeModalRegisterScrollY
  } = useContext(Context) as ContextType;
  const [typeValue, setTypeValue] = useState<string>("cpf");
  const [cpfOCnpj, setCpfOCnpj] = useState<string>("");
  const [country, setCountry] = useState<string>("+55");
  const [valuePhone, setValuePhone] = useState<string>("");
  const [responseError, setResponseError] = useState("");
  const [isDocumentValid, setIsDocumentValid] = useState<boolean>(false);

  // Definir o esquema dentro do componente para acesso ao estado typeValue
  const formSchema = z.object({
    name: z.string().min(5, 'O nome completo é obrigatório'),
    documentType: z.enum(['cpf', 'cnpj']),
    document: z.string()
      .min(1, 'O documento é obrigatório')
      .refine((val) => {
        const clearValue = val.replace(/\D/g, '');
        if (clearValue.length === 0) return false;

        if (typeValue === 'cpf') {
          return validateCPF(clearValue);
        } else if (typeValue === 'cnpj') {
          return validateCNPJ(clearValue);
        }
        return false;
      }, "Documento inválido. Verifique os números informados."),
    email: z.string().email('Email inválido'),
    country: z.string().min(1, 'País é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    dateOfBirth: z.string().min(1, 'Data de nascimento é obrigatória'),
    gender: z.enum(['masculino', 'feminino', 'outro', 'prefiro_nao_dizer']),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    acceptOffers: z.boolean(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: "Você precisa aceitar os termos e políticas para continuar"
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      documentType: "cpf",
      document: "",
      country: "",
      gender: "prefiro_nao_dizer",
      acceptOffers: false,
      acceptTerms: false,
      email: "",
      phone: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    }
  });

  useEffect(() => {
    setResponseError("");
  }, [watch('email')]);

  useEffect(() => {
    setValue('document', cpfOCnpj);
  }, [cpfOCnpj, setValue]);

  useEffect(() => {
    setValue('phone', valuePhone);
  }, [valuePhone, setValue]);

  useEffect(() => {
    setValue('documentType', typeValue as 'cpf' | 'cnpj');
  }, [typeValue, setValue]);

  useEffect(() => {
    setValue('country', country);
  }, [country, setValue]);

  useEffect(() => {
    setCpfOCnpj("");
    setIsDocumentValid(false);
  }, [typeValue]);

  const handleInputChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");

    if (typeValue.toLowerCase() === "cpf") {
      setCpfOCnpj(formatCPF(onlyNumbers));
      // Validação em tempo real
      const isValid = onlyNumbers.length === 11 ? validateCPF(onlyNumbers) : false;
      setIsDocumentValid(isValid);
    } else if (typeValue.toLowerCase() === "cnpj") {
      setCpfOCnpj(formatCNPJ(onlyNumbers));
      // Validação em tempo real
      const isValid = onlyNumbers.length === 14 ? validateCNPJ(onlyNumbers) : false;
      setIsDocumentValid(isValid);
    } else {
      setCpfOCnpj(onlyNumbers);
      setIsDocumentValid(false);
    }
  };

  useEffect(() => {
    setValuePhone("");
  }, [country]);

  const handlePhone = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    setValuePhone(formatPhone(onlyNumbers));
  };

  const onSubmit = async (data: FormData) => {
    const formData = {
      ...data,
      phone: data.country + extractPhoneNumber(data.phone),
    };

    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        name: formData.name,
        cpf_or_cnpj: formData.document,
        genero: formData.gender,
        dateOfBirth: new Date(formData.dateOfBirth),
        phone: formData.phone,
        password: formData.password,
        acceptOffers: formData.acceptOffers,
        acceptTerms: formData.acceptTerms,
        documentType: formData.documentType
      });

      toast.success('Registro realizado com sucesso!');

    } catch (error: any) {
      setResponseError(error.response?.data?.message || "Ocorreu um erro no registro");
      toast.error(`Erro ao realizar registro! ${error.response?.data?.message || "Tente novamente mais tarde"}`);
    }
  };

  function openLogin() {
    openCloseModalRegister();
    openCloseModalLogin();
  }

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 300) {
        closeModalRegisterScrollY();
      }
    }

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isOpenModalRegister && (
        <div className="flex items-center w-full justify-center absolute">
          <main ref={openModalRegisterRef} className="z-99 relative bg-gray-600 max-w-125 md:max-w-230 w-full flex flex-col items-center justify-center space-y-2 px-10 py-5 text-center border border-gray-400 rounded-lg overflow-auto">
            <button
              onClick={openCloseModalRegister}
              className="text-primary hover:text-hover absolute top-2 right-2">
              <X />
            </button>
            <h1 className="text-2xl font-bold">Faça o cadastro</h1>
            <form className="w-full space-y-4 my-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Nome */}
                <div className="flex flex-col items-start">
                  <Label
                    className={errors.name ? "text-danger" : ""}
                  >
                    Nome:
                  </Label>
                  <Input
                    type="text"
                    placeholder="Nome completo"
                    {...register('name')}
                    className={errors.name ? "border-danger" : ""}
                  />
                  {errors.name && <span className="text-danger text-xs mt-1 text-left">{errors.name.message}</span>}
                </div>

                {/* CPF/CNPJ */}
                <div className="flex flex-col items-start">
                  <Label
                    className={errors.document ? "text-danger" : ""}
                  >
                    CPF ou CNPJ:
                  </Label>
                  <CPForCNPJ
                    selectedType={typeValue}
                    onChangeType={setTypeValue}
                    cpfCnpj={cpfOCnpj}
                    setCpfCnpj={handleInputChange}
                    className={errors.document ? "border-danger" : ""}
                  />
                  {errors.document && <span className="text-danger text-xs mt-1 text-left">{errors.document.message}</span>}
                  {cpfOCnpj && !errors.document && (
                    <span className={`text-xs mt-1 text-left ${isDocumentValid ? "text-green-500" : "text-amber-500"}`}>
                      {isDocumentValid ? "Documento válido" : "Verificando documento..."}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col items-start">
                  <Label
                    className={errors.email ? "text-danger" : ""}
                  >
                    Email:
                  </Label>
                  <Input
                    type="text"
                    placeholder="Email"
                    {...register('email')}
                    className={errors.email ? "border-danger" : ""}
                  />
                  {errors.email && <span className="text-danger text-xs mt-1 text-left">{errors.email.message}</span>}
                </div>

                {/* Telefone */}
                <div className="flex flex-col items-start">
                  <Label
                    className={errors.phone ? "text-danger" : ""}
                  >
                    Celular:
                  </Label>
                  <InputPhone
                    selectCountry={country}
                    onChangeCountry={setCountry}
                    phone={valuePhone || ''}
                    setPhone={handlePhone}
                    className={errors.phone ? "border-danger" : ""}
                  />
                  {errors.phone && <span className="text-danger text-xs mt-1 text-left">{errors.phone.message}</span>}
                </div>

                {/* Data de nascimento */}
                <div className="flex flex-col items-start">
                  <Label
                    className={errors.dateOfBirth ? "text-danger" : ""}
                  >
                    Data de nascimento:
                  </Label>
                  <Input
                    type="date"
                    placeholder="Data de nascimento"
                    {...register('dateOfBirth')}
                    className={errors.dateOfBirth ? "border-danger" : ""}
                  />
                  {errors.dateOfBirth && <span className="text-danger text-xs mt-1 text-left">{errors.dateOfBirth.message}</span>}
                </div>

                {/* Gênero */}
                <div className="flex flex-col items-start">
                  <Label
                    className={errors.gender ? "text-danger" : ""}
                  >
                    Genero:
                  </Label>
                  <select
                    {...register('gender')}
                    className={`outline-0 border border-gray-400 rounded-lg px-1 w-full h-10 ${errors.gender ? "border-danger" : ""}`}
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="prefiro_nao_dizer">Prefiro não dizer</option>
                  </select>
                  {errors.gender && <span className="text-danger text-xs mt-1 text-left">{errors.gender.message}</span>}
                </div>

                {/* Senha */}
                <div className="flex flex-col items-start">
                  <Label
                    className={errors.password ? "text-danger" : ""}
                  >
                    Senha:
                  </Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputPassword
                        placeholder="Senha"
                        value={field.value || ''}
                        onChange={field.onChange}
                        className={errors.password ? "border-danger" : ""}
                      />
                    )}
                  />
                  {errors.password && <span className="text-danger text-xs mt-1 text-left">{errors.password.message}</span>}
                </div>

                {/* Confirmar senha */}
                <div className="flex flex-col items-start">
                  <Label
                    className={errors.confirmPassword ? "text-danger" : ""}
                  >
                    Confirmar senha:
                  </Label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <InputPassword
                        placeholder="Confirmar senha"
                        value={field.value || ''}
                        onChange={field.onChange}
                        className={errors.confirmPassword ? "border-danger" : ""}
                      />
                    )}
                  />
                  {errors.confirmPassword && <span className="text-danger text-xs mt-1 text-left">{errors.confirmPassword.message}</span>}
                </div>
              </div>

              {responseError && (<p className="text-danger">{responseError}</p>)}

              <div className="w-full space-y-4">
                <div className="space-y-4 w-full">
                  {/* Aceitar ofertas */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('acceptOffers')}
                      className="p-2 appearance-none border border-primary checked:bg-primary checked:border-gray-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain cursor-pointer"
                    />
                    <p className="text-sm">Quero receber ofertas e novidades por e-mail, SMS, WhatsApp ou mensagens nos App's POWERGADGET!</p>
                  </div>

                  {/* Aceitar termos */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('acceptTerms')}
                      className={`p-2 appearance-none border ${errors.acceptTerms ? "border-danger" : "border-primary"} checked:bg-primary checked:border-gray-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain cursor-pointer`}
                    />
                    <span className="text-sm">Li e estou de acordo com as{' '}
                      <Link href="/terms" className="text-primary underline">
                        políticas da empresa
                      </Link>
                      {' e '}
                      <Link href="/policies" className="text-primary underline">
                        políticas de privacidade
                      </Link>.
                    </span>
                  </div>
                  {errors.acceptTerms && <span className="text-danger text-xs mt-1 text-left">{errors.acceptTerms.message}</span>}
                </div>

                {/* Botão de submit com estado de loading */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                >
                  {isSubmitting ?
                    <LoadingButton />
                    : "Cadastrar"}
                </Button>
              </div>
            </form>

            <div className="w-full flex items-center gap-3">
              <hr className="border border-gray-300 w-full" />
              <span>ou</span>
              <hr className="border border-gray-300 w-full" />
            </div>

            <GoogleLoginButton name="Cadastrar-se com Google" />

            <p className="text-center">
              Já tem uma conta?{' '}
              <button onClick={openLogin} className="text-primary hover:text-hover">
                Conecte-se.
              </button>
            </p>
          </main>
        </div>
      )}
    </>
  );
}