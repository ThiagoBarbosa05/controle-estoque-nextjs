export function formatPhone(value: string): string {
  const onlyDigits = value.replace(/\D/g, '').slice(0, 11);
  return onlyDigits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}