"use client"
import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { twMerge } from "tailwind-merge";

// Tipos base
type InputVariant = "default" | "error" | "success";
type InputSize = "sm" | "default" | "lg";

// Configuração de variantes para inputs
const inputVariants = {
  base: "outline-0 bg-transparent backdrop-blur-sm border rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-offset-1 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed",

  variants: {
    variant: {
      default: "border-border focus:border-primary",
      error: "border-danger focus:border-danger focus:ring-danger/20",
      success: "border-green-500 focus:border-green-500 focus:ring-green-500/20"
    },
    size: {
      sm: "h-8 px-2 text-sm",
      default: "h-10 px-3",
      lg: "h-12 px-4 text-lg"
    }
  },

  defaultVariants: {
    variant: "default" as InputVariant,
    size: "default" as InputSize
  }
};

// Interface para Input simples
interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  error?: boolean; // mantido para compatibilidade, mas usa variant internamente
}

// Componente Input
export function Input({
  variant,
  size = inputVariants.defaultVariants.size,
  error = false,
  className,
  ...props
}: InputProps) {
  // Se error for true, força variant para "error"
  const finalVariant = error ? "error" : (variant || inputVariants.defaultVariants.variant);

  const variantStyles = inputVariants.variants.variant[finalVariant];
  const sizeStyles = inputVariants.variants.size[size];

  return (
    <input
      className={twMerge(
        inputVariants.base,
        variantStyles,
        sizeStyles,
        "w-full input-date", // mantendo sua classe customizada
        className
      )}
      {...props}
    />
  );
}

// Interface para Input Password
interface InputPasswordProps extends Omit<ComponentProps<'input'>, 'type' | 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  error?: boolean;
}

// Componente Input Password
export function InputPassword({
  variant,
  size = inputVariants.defaultVariants.size,
  error = false,
  className,
  ...props
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Se error for true, força variant para "error"
  const finalVariant = error ? "error" : (variant || inputVariants.defaultVariants.variant);

  const variantStyles = inputVariants.variants.variant[finalVariant];
  const sizeStyles = inputVariants.variants.size[size];

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        className={twMerge(
          inputVariants.base,
          variantStyles,
          sizeStyles,
          "w-full pr-10", // espaço para o botão
          className
        )}
        {...props}
      />
      <button
        type="button"
        onClick={togglePassword}
        className={twMerge(
          "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 transition-colors",
          "text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
        )}
        tabIndex={-1} // não interfere na navegação por tab
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "Ocultar senha" : "Mostrar senha"}
        </span>
      </button>
    </div>
  );
}