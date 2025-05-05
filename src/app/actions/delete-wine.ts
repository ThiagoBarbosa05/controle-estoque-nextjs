"use server";

import { revalidatePath, revalidateTag } from "next/cache";
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
      const messageResponse = await response.json();
      throw new Error(messageResponse.message);
    }
  } catch (error) {
    console.log(error);
    return ActionsResponse.onError({ err: error, status: "ERROR" });
  }

  revalidatePath("/vinhos");
  revalidateTag("dashboard-metrics");
  redirect("/vinhos");
}
