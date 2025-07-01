import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends ComponentProps<'label'> {
  children: ReactNode;
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      htmlFor=""
      className={twMerge("font-semibold", className)}
      {...props}
    >
      {children}
    </label>
  )
}