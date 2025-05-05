"use server";

import { z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { getToken } from "../auth/get-token";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const countWineSchema = z.object({
  customerId: z.string({ message: "Cliente do consignado é obrigatório" }),
  consignedId: z.string({ message: "É preciso informar o id do consignado" }),
  counts: z.array(
    z.object({
      wineId: z.string({
        message: "É preciso inserir o vinho para a contagem",
      }),
      quantity: z.coerce.number().default(0),
    })
  ),
});

export async function countWine(formState: FormState, formData: FormData) {
  try {
    const winesId = formData.getAll("wineId");
    const quantities = formData.getAll("quantity");
    const customerId = formData.get("customerId");
    const consignedId = formData.get("consignedId");

    const winesOnConsigned = winesId.map((wineId, index) => ({
      wineId: wineId.toString(),
      quantity: Number(quantities[index]),
    }));

    const count = countWineSchema.parse({
      customerId,
      consignedId,
      counts: winesOnConsigned,
    });

    const accessToken = await getToken();

    const response = await fetch(
      `${process.env.API_BASE_URL}/consigned/count/${count.consignedId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          customerId: count.customerId,
          counts: count.counts,
        }),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    return ActionsResponse.onError({
      err: error,
      status: "ERROR",
      payload: formData,
    });
  }

  revalidateTag("consigned-details");
  revalidateTag("consigned-history");
  revalidateTag("dashboard-metrics");
  revalidatePath("/consignados");
  redirect("/consignados");
}
