export function validateCPF(cpf: string): boolean {
  // Remover caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');

  // Verificar se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;

  // Verificar se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit1 = remainder === 10 || remainder === 11 ? 0 : remainder;

  if (digit1 !== parseInt(cleanCPF.charAt(9))) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let digit2 = remainder === 10 || remainder === 11 ? 0 : remainder;

  return digit2 === parseInt(cleanCPF.charAt(10));
}
