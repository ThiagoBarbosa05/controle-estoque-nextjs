import { z } from "zod";

export const zodCepValidator = z
.string()
.trim()
.regex(/^\d{5}-?\d{3}$/, {
  message: 'CEP inválido',
})
.transform((cep) => cep.replace(/\D/g, '')).or(z.literal(""))