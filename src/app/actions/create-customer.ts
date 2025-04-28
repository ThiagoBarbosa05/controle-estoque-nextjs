"use server"

import { z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { zodCNPJ } from "@/lib/cnpj-validator";
import { zodCepValidator } from "@/lib/cep-validator";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getToken } from "../auth/get-token";

const cellphoneRegex = /^(\(?\d{2}\)?\s?)?(9\d{4})-?(\d{4})$/;
const businessPhoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4})-?(\d{4})$/;

const addressSchema = z.object({
  streetAddress: z.string().optional(),
  zipCode: zodCepValidator,
  city: z.string().optional(),
  state: z.string().optional(),
  neighborhood: z.string().optional(),
  number: z.string().optional(),
});

const createCustomerSchema = z.object({
  name: z.string().min(1, { message: "O campo Nome é obrigatório" }),
  document: zodCNPJ(),
  contactPerson: z.string().optional(),
  email: z.string().email({ message: "Insira um email válido" }).optional().or(z.literal("")),
  cellphone: z.string()
    .regex(cellphoneRegex, {
      message: "Número de celular inválido. Ex: (11) 91234-5678",
    })
    .optional()
    .nullable()
    .or(z.literal("")),
  businessPhone: z.string()
    .regex(businessPhoneRegex, {
      message: "Número de telefone comercial inválido. Ex: (11) 1234-5678",
    })
    .optional()
    .nullable()
    .or(z.literal("")),
  address: addressSchema.optional().nullable(),
  stateRegistration: z.string().min(1, {message: "Esse campo é obrigatório"}),
}).strict();

// const customerFormSchema = z.object({
//   name: z.string().min(1, { message: "O campo Nome é obrigatório" }),
//   document: zodCNPJ(),
//   contactPerson: z.string().optional(),
//   email: z.string().email({ message: "Insira um email válido" }).optional(),
//   cellphone: z
//     .string()
//     .regex(cellphoneRegex, {
//       message: "Número de celular inválido. Ex: (11) 91234-5678",
//     })
//     .optional().nullable(),
//   businessPhone: z
//     .string()
//     .regex(businessPhoneRegex, {
//       message: "Número de telefone comercial inválido. Ex: (11) 1234-5678",
//     })
//     .optional().nullable(),
//     address: z.object({
//       streetAddress: z.string().optional(),
//       zipCode: zodCepValidator,
//       city: z.string().optional(),
//       state: z.string().optional(),
//       neighborhood: z.string().optional(),
//       number: z.string().optional(),
//     }).optional().nullable(),
//   stateRegistration: z.string(),
// });

export async function createCustomer(formState: FormState, formData: FormData) {
  try {
    const newCustomer = createCustomerSchema.parse({
      name: formData.get("name"),
      document: formData.get("document"),
      contactPerson: formData.get("contactPerson"),
      email: formData.get("email"),
      cellphone: formData.get("cellphone"),
      businessPhone: formData.get("businessPhone"),
      address: {
        city: formData.get("city"),
        neighborhood: formData.get("neighborhood"),
        number: formData.get("number"),
        state: formData.get("state"),
        streetAddress: formData.get("streetAddress"),
        zipCode: formData.get("zipCode"),
      },
      stateRegistration: formData.get("stateRegistration"),
    })

    const accessToken = await getToken()



    const response = await fetch("http://localhost:4000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(newCustomer)
    })

    if(!response.ok) {
      const result = await response.json()

      return ActionsResponse.onError({err: new Error(result.message), status: "ERROR", payload: formData})
    }
  } 
  catch (error) {
    return ActionsResponse.onError({err: error, status: "ERROR", payload: formData})
  }

  revalidateTag("dashboard-metrics")
  revalidatePath("/clientes")
  redirect(`/clientes`)
}