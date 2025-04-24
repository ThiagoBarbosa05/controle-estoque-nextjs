export function formatLandline(value: string): string {
  const onlyDigits = value.replace(/\D/g, '').slice(0, 10); // (99) 9999-9999
  return onlyDigits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}