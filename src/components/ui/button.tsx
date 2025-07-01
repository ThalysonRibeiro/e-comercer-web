import type { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost";
type Size = "default" | "sm" | "lg" | "icon";

const buttonVariants = {
  base: "w-full inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

  variants: {
    variant: {
      // Usando variáveis semânticas
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default" as const,
    size: "default" as const,
  }
};

export function Button({
  variant = buttonVariants.defaultVariants.variant,
  size = buttonVariants.defaultVariants.size,
  children,
  className,
  ...props
}: ButtonProps) {

  const variantStyles = buttonVariants.variants.variant[variant];
  const sizeStyles = buttonVariants.variants.size[size];

  return (
    <button
      className={twMerge(
        buttonVariants.base,
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}