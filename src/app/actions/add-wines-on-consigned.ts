"use server";

import { z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { getToken } from "../auth/get-token";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const addWinesOnConsignedSchema = z.object({
  consignedId: z.string({
    message: "É preciso informar o consignado para adicionar os vinhos",
  }),
  wines: z
    .array(
      z.object({
        wineId: z.string({ message: "É preciso informar o id do vinho" }),
        quantity: z.number().default(1),
      })
    )
    .min(1, { message: "É preciso informar pelo menos um vinho" }),
});

export async function addWinesOnConsigned(
  customerId: string,
  existingWines: { wineId: string; quantity: number }[] | undefined,
  formsState: FormState,
  formData: FormData
) {
  const consignedId = formData.get("consignedId");
  const winesId = formData.getAll("wineId");
  const quantities = formData.getAll("quantity");
  try {
    const accessToken = await getToken();

    const newWinesOnConsigned = winesId.map((wineId, index) => ({
      wineId: wineId.toString(),
      quantity: Number(quantities[index]),
    }));

    const newWinesOnConsignedSchema = addWinesOnConsignedSchema.parse({
      consignedId,
      wines: newWinesOnConsigned,
    });

    existingWines?.forEach((wine) => {
      const wineToAdd = newWinesOnConsignedSchema.wines;
      wineToAdd.push(wine);
    });

    const response = await fetch(
      `${process.env.API_BASE_URL}/consigned/new-wines/${newWinesOnConsignedSchema.consignedId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          consignedId: newWinesOnConsignedSchema.consignedId,
          wines: newWinesOnConsignedSchema.wines,
        }),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      console.log(result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    return ActionsResponse.onError({
      err: error,
      status: "ERROR",
      payload: formData,
    });
  }

  revalidatePath(`/consignados/${consignedId}/${customerId}/inicio`);
  revalidatePath(`/estoque`);
  redirect(`/consignados/${consignedId}/${customerId}/inicio`);
}
