// Função para validar CNPJ
export function validateCNPJ(cnpj: string): boolean {
  // Remover caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '');

  // Verificar se tem 14 dígitos
  if (cleanCNPJ.length !== 14) return false;

  // Verificar se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  // Validação do primeiro dígito verificador
  let size = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, size);
  const digits = cleanCNPJ.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  // Validação do segundo dígito verificador
  size = size + 1;
  numbers = cleanCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return result === parseInt(digits.charAt(1));
}


