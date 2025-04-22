"use client"

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface CPForCNPJProps extends ComponentProps<'div'> {
  selectedType: string;
  onChangeType: (value: string) => void;
  cpfCnpj: string;
  setCpfCnpj: (value: string) => void;
}
export function CPForCNPJ({ selectedType, onChangeType, cpfCnpj, setCpfCnpj, className, ...props }: CPForCNPJProps) {
  return (
    <div className={twMerge("h-10 w-full border border-borderColor rounded-lg flex items-center px-1 gap-2.5 focus-within:border-primaryColor", className)}{...props}>
      <select
        value={selectedType}
        onChange={(e) => onChangeType(e.target.value)}
        className="outline-0 bg-transparent backdrop-blur-sm rounded-lg"
      >
        <option className="bg-bgCard" value="cpf">CPF</option>
        <option className="bg-bgCard" value="cnpj">CNPJ</option>
      </select>
      <input
        type="text"
        className="outline-0 bg-transparent rounded-lg w-full"
        placeholder={selectedType === "cpf" ? "Digite seu CPF" : "Digite seu CNPJ"}
        value={cpfCnpj}
        onChange={(e) => setCpfCnpj(e.target.value)}
        maxLength={selectedType === "cpf" ? 14 : 18}
      />
    </div>
  );
}