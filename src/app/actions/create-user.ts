"use server"

import { z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { getToken } from "../auth/get-token";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createUserSchema = z.object({
  email: z.string().email({message: "Insira um email válido"}),
  password: z.string().min(1, {message: "Insira uma senha para o usuário"}),
  name: z.string().min(1, {message: "Insira um nome para o usuário"}),
  customer: z.string().optional().nullable(),
  role: z.string().min(1, {message: "Defina um cargo para o usuário"}),
  // permissionsId: z.array(z.string()).optional()  
})


export async function createUser(formState: FormState, formData: FormData) {
  try {
    const newUser = createUserSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
      customer: formData.get("customer"),
      role: formData.get("role"),
    })
  
    const accessToken = await getToken()

    const response = await fetch(`${process.env.API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
        associatedCustomerId: newUser.customer,
        roleId: newUser.role
      })
    })
    if(!response.ok) {
      const result = await response.json()
      return ActionsResponse.onError({err: new Error(result.message), status: "ERROR", payload: formData})
    }

  }
  catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return ActionsResponse.onError({err: error, status: "ERROR", payload: formData})
    }
  }
  revalidatePath("/usuarios")
  redirect("/usuarios")
}