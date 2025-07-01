"use client"

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface InputPhoneProps extends ComponentProps<'div'> {
  selectCountry: string;
  onChangeCountry: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}
type OptionsType = {
  value: string;
  name: string;
}

const optionsArray: OptionsType[] = [
  { value: "+55", name: "BR" },
  { value: "+1", name: "US" },
  { value: "+351", name: "PT", },
  { value: "+54", name: "AR", },
  { value: "+49", name: "DE", },
  { value: "+33", name: "FR", },
  { value: "+44", name: "GB", },
  { value: "+39", name: "IT", },
  { value: "+34", name: "ES", },
  { value: "+52", name: "MX", },
  { value: "+81", name: "JP", },
  { value: "+86", name: "CN", },
  { value: "+91", name: "IN", },
  { value: "+7", name: "RU", },
  { value: "+61", name: "AU", },
  { value: "+27", name: "ZA", },
  { value: "+56", name: "CL", },
  { value: "+57", name: "CO", },
  { value: "+58", name: "VE", },
  { value: "+595", name: "PY", },
  { value: "+598", name: "UY", },
];


export function InputPhone({ onChangeCountry, selectCountry, phone, setPhone, className, ...props }: InputPhoneProps) {
  return (
    <div className={twMerge("flex items-center w-full h-10 border border-border rounded-lg px-1 gap-2.5 focus-within:border-primary", className)}{...props}>
      <select
        value={selectCountry}
        onChange={(e) => onChangeCountry(e.target.value)}
        className="text-sm outline-0 bg-transparent backdrop-blur-sm rounded-lg"
      >
        {optionsArray.map(option => (
          <option className="bg-bgCard" key={option.name} value={option.value}>{option.name} {option.value}</option>
        ))}
      </select>

      <input
        type="text"
        className="outline-0 bg-transparent rounded-lg w-full"
        placeholder="Numero de Celular"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        maxLength={15}
      />
    </div>
  )
}