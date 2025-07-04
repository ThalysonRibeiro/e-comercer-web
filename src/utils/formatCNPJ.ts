export function formatCNPJ(cnpj: string) {
  // Remove caracteres não numéricos
  const cleanCnpj = cnpj.replace(/\D/g, '');

  // Verifica se tem 14 dígitos
  if (cleanCnpj.length !== 14) {
    throw new Error('CNPJ deve ter exatamente 14 dígitos');
  }

  return cleanCnpj
    .replace(/(\d{2})(\d)/, "$1.$2")        // XX.
    .replace(/(\d{2}\.\d{3})(\d)/, "$1.$2") // XX.XXX.
    .replace(/(\d{2}\.\d{3}\.\d{3})(\d)/, "$1/$2") // XX.XXX.XXX/
    .replace(/(\d{2}\.\d{3}\.\d{3}\/\d{4})(\d)/, "$1-$2") // XX.XXX.XXX/XXXX-XX
}

// Exemplo de uso:
// formatCNPJ("12345678000195") // retorna "12.345.678/0001-95"