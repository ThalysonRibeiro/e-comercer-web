"use client"
import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { IconType } from 'react-icons/lib';

// Definição dos tipos de toast
const TOAST_TYPES: ToastStylesMap = {
  success: {
    bgClass: 'bg-warning border-green-400 text-green',
    iconColor: 'text-green-500',
    icon: CheckCircle
  },
  error: {
    bgClass: 'bg-warning border-red-400 text-red',
    iconColor: 'text-red-500',
    icon: XCircle
  },
  warning: {
    bgClass: 'bg-warning border-yellow-400 text-yellow',
    iconColor: 'text-yellow-500',
    icon: AlertCircle
  },
  info: {
    bgClass: 'bg-warning border-blue-400 text-blue',
    iconColor: 'text-blue-500',
    icon: AlertCircle
  }
};

// Definição dos tipos básicos
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Tipo para os estilos dos toasts
type ToastStyleType = {
  bgClass: string;
  iconColor: string;
  icon: IconType;
};

// Mapeamento de tipos para estilos
type ToastStylesMap = {
  [key in ToastType]: ToastStyleType;
};

// Props para o componente ToastItem
interface ToastItemProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}


// Componente de Toast individual
export function ToastItem({ id, type, message, onClose, duration = 3000 }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  const toastStyle = TOAST_TYPES[type] || TOAST_TYPES.info;

  return (
    <div className={`${toastStyle.bgClass} border px-4 py-3 rounded relative mb-2 flex items-center justify-between`}>
      <span><toastStyle.icon />{message}</span>
      <button
        onClick={() => onClose(id)}
        className="ml-4 inline-flex"
      >
        <X size={18} className={toastStyle.iconColor} />
      </button>
    </div>
  );
};
