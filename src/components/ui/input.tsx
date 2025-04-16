"use client"
import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends ComponentProps<'input'> {
  error?: boolean;
}
export function Input({ error = false, ...props }: InputProps) {
  return (
    <input
      data-error={error}
      className="px-2 outline-0 bg-transparent backdrop-blur-sm border border-gray-400 focus-within:border-primary data-[error=true]:border-danger w-full h-10 rounded-lg"
      {...props}
    />
  )
}

interface InputButtonPasswordProps extends ComponentProps<'input'> {
  error?: boolean
}
export function InputPassword({ error, value, onChange, ...props }: InputButtonPasswordProps) {
  const [showPassword, setShowpassword] = useState(false);

  function togglePassword() {
    setShowpassword(!showPassword);
  }

  return (
    <div
      data-error={error}
      className="flex outline-0 bg-transparent backdrop-blur-sm border border-gray-400 focus-within:border-primary data-[error=true]:border-danger w-full rounded-lg"
    >
      <input
        type={showPassword ? 'text' : 'password'}
        className="outline-0 w-full h-10 rounded-lg px-2"
        value={value}
        onChange={onChange}
        {...props}
      />
      <button type="button" onClick={togglePassword} className="mr-2">
        {showPassword ? <Eye /> : <EyeOff />}
      </button>
    </div>
  )
}