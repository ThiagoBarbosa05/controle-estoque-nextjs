"use server"

import { redirect } from "next/navigation"
import { ActionsResponse } from "./error-handler"
import { revalidatePath, revalidateTag } from "next/cache"
import { getToken } from "../auth/get-token"

export async function deleteCustomer(customerId: string) {

  const accessToken = await getToken()

  const response = await fetch(`http://localhost:4000/api/customers/${customerId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if(response.status !== 204) {
    const result = await response.json()
    return ActionsResponse.onError({err: new Error(result.message), status: "ERROR"})
  }

  revalidateTag("dashboard-metrics")
  revalidatePath("/clientes")
  redirect("/clientes")
}

