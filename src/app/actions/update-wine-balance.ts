"use server";

import { z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { getToken } from "../auth/get-token";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const updateWineBalanceSchema = z.object({
  consignedId: z.string({ message: "É preciso informar o consignado" }),
  wineId: z.string({ message: "É preciso informar o vinho" }),
  balance: z.coerce.number().default(0),
});

export async function updateWineBalance(
  formState: FormState,
  formData: FormData
) {
  const consignedId = formData.get("consignedId");
  const wineId = formData.get("wineId");
  const balance = formData.get("balance");
  const customerId = formData.get("customerId");
  try {
    const updateWineBalance = updateWineBalanceSchema.parse({
      consignedId,
      wineId,
      balance,
    });

    const accessToken = await getToken();

    const response = await fetch(
      `${process.env.API_BASE_URL}/consigned/wine/balance`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          consignedId: updateWineBalance.consignedId,
          wineId: updateWineBalance.wineId,
          balance: updateWineBalance.balance,
        }),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      throw new Error("Não foi possível realizar esta operação.");
    }
  } catch (error) {
    return ActionsResponse.onError({
      err: error,
      status: "ERROR",
      payload: formData,
    });
  }

  revalidatePath(`/consignados/${consignedId}/${customerId}/inicio`);
  revalidatePath(`/consignados`);
  revalidateTag("dashboard-metrics");
  revalidateTag("consigned-details");

  return ActionsResponse.onSuccess({
    message: "Quantidade atualizada com sucesso!",
    status: "SUCCESS",
  });
}
