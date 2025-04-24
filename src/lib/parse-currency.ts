export function parseCurrencyToNumber(value: string) {
  if (!value) return 0;

  // Remove "R$", espaços, e substitui vírgula por ponto
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.');

  return parseFloat(cleaned).toFixed(2);
}