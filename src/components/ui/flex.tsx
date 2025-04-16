import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface FlexProps extends ComponentProps<'div'> { }
export function Flex({ className, ...props }: FlexProps) {
  return (
    <div className={twMerge("flex", className)} {...props} />
  )
}