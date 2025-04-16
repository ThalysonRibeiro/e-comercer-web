import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface GridProps extends ComponentProps<'div'> { }
export function Grid({ className, ...props }: GridProps) {
  return (
    <div className={twMerge("grid", className)} {...props} />
  )
}