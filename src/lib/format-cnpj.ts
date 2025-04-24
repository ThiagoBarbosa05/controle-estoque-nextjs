export function formatCNPJ(value: string): string {
  const onlyDigits = value.replace(/\D/g, '').slice(0, 14);
  return onlyDigits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}