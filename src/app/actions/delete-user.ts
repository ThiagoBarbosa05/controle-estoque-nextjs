"use server"

import { redirect } from "next/navigation"
import { getToken } from "../auth/get-token"
import { ActionsResponse } from "./error-handler"
import { revalidatePath } from "next/cache"

export async function deleteUser(userId: string) {
  
  try {
    const accessToken = await getToken()
      const response = await fetch(`${process.env.API_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Erro ao deletar usuário.")
      }
  }
  catch (error) {
    console.log(error)
    return ActionsResponse.onError({err: error, status: "ERROR"})
  }

  revalidatePath("/usuarios")
  redirect("/usuarios")
}
