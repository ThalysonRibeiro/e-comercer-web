import { startOfWeek, format } from 'date-fns';
import { ptBR } from "date-fns/locale";
export function formatDate(date: Date) {
  return format(startOfWeek(date), 'd MMM YYY', { locale: ptBR })
}