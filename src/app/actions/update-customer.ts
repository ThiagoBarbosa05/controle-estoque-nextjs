"use server"

import {  z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { zodCNPJ } from "@/lib/cnpj-validator";
import { zodCepValidator } from "@/lib/cep-validator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

const updateCustomerSchema = z.object({
  customerId: z.string().optional(),
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


export async function updateCustomer(formState: FormState, formData: FormData) {
  try {
    const customer = updateCustomerSchema.parse({
      customerId: formData.get("customerId"),
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

    const response = await fetch(`http://localhost:4000/api/customers/${customer.customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: customer.name,
        document: customer.document,
        contactPerson: customer.contactPerson,
        email: customer.email,
        cellphone: customer.cellphone,
        businessPhone: customer.businessPhone,
        address: customer.address,
        stateRegistration: customer.stateRegistration
      })
    })

    if(!response.ok) {
      const result = await response.json()
      console.log(result)

      return ActionsResponse.onError({err: new Error(result.message), status: "ERROR", payload: formData})
    }
  } 
  catch (error) {
    return ActionsResponse.onError({err: error, status: "ERROR", payload: formData})
  }

  revalidatePath(`/clientes/${formData.get("customerId")}`)
  redirect(`/clientes/${formData.get("customerId")}`)
}