import type { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge";


interface LinkProps extends ComponentProps<'a'> {
  children: ReactNode;
  link: string;
}
export function LinkBUtton({ children, className, link, ...props }: LinkProps) {
  return (
    <a
      href={link}
      className={twMerge("flex items-center justify-center cursor-pointer bg-primaryColor w-full h-10 rounded-lg text-textButton font-semibold hover:bg-hover transition duration-300", className)}{...props}
    >
      {children}
    </a>
  )
}