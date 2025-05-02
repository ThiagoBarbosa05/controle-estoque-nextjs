"use server";

import { revalidatePath } from "next/cache";
import { getToken } from "../auth/get-token";
import { ActionsResponse } from "./error-handler";
import { redirect } from "next/navigation";

export async function deleteWine(wineId: string) {
  try {
    const accessToken = await getToken();
    const response = await fetch(
      `${process.env.API_BASE_URL}/wines/${wineId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.log(await response.json());
      throw new Error("Erro ao deletar vinho.");
    }
  } catch (error) {
    console.log(error);
    return ActionsResponse.onError({ err: error, status: "ERROR" });
  }

  revalidatePath("/vinhos");
  redirect("/vinhos");
}
