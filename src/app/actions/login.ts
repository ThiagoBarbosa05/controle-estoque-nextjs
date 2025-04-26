"use server"

import { z } from "zod"
import { ActionsResponse, FormState } from "./error-handler"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const authenticateUserSchema = z.object({
  email: z.string().email({message: "Esse campo é obrigatório" }),
  password: z.string({message: "Esse campo é obrigatório"})
})

export async function login(formState: FormState, formData: FormData) {

  try {
   const credentials = authenticateUserSchema.parse({
    email: formData.get("email"),
    password: formData.get("password")
   })

   const response = await fetch("http://localhost:4000/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
   })

  if(!response.ok) {
    const result = await response.json()
    return ActionsResponse.onError({err: new Error(result.message), status: "ERROR", "payload": formData})
  }

   const result = await response.json()

   const cookieStore = await cookies()

   cookieStore.set("access_token", result.accessToken)
  } catch (error) {
      return ActionsResponse.onError({
        err: error, 
        status: "ERROR", 
        payload: formData
      })
    }
  
    redirect("/dashboard")
}