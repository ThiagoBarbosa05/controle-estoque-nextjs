"use server"

import { redirect } from "next/navigation"
import { ActionsResponse } from "./error-handler"
import { revalidatePath } from "next/cache"

export async function deleteCustomer(customerId: string) {

  const response = await fetch(`http://localhost:4000/api/customers/${customerId}`, {
    method: "PATCH"
  })

  if(response.status !== 204) {
    const result = await response.json()
    return ActionsResponse.onError({err: new Error(result.message), status: "ERROR"})
  }

  revalidatePath("/clientes")
  redirect("/clientes")
}

