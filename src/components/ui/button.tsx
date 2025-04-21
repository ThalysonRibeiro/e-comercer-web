import type { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge";


interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}
export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge("flex items-center justify-center cursor-pointer bg-primaryColor w-full h-10 rounded-lg text-textButton font-semibold hover:bg-hover transition duration-300", className)}{...props}
    >
      {children}
    </button>
  )
}