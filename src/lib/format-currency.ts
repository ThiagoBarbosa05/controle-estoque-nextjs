export function formatCurrencyInput(value: string): string {
  const onlyDigits = value.replace(/\D/g, "");
  const numericValue = parseFloat(onlyDigits) / 100;

  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
