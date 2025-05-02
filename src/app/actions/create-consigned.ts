"use server";

import { z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { getToken } from "../auth/get-token";
import { revalidatePath } from "next/cache";

const createConsignedSchema = z.object({
  customerId: z.string({
    message: "É preciso informar o cliente para criação do consignado",
  }),
  wines: z
    .array(
      z.object({
        id: z.string({ message: "É preciso informar o id do vinho" }),
        quantity: z.number().default(1),
      })
    )
    .min(1, { message: "É preciso informar pelo menos um vinho" }),
});

export async function createConsigned(
  formState: FormState,
  formData: FormData
) {
  try {
    const accessToken = await getToken();
    const customerId = formData.get("customerId");
    const winesId = formData.getAll("wineId");
    const quantities = formData.getAll("quantity");

    const winesOnConsigned = winesId.map((wineId, index) => ({
      id: wineId.toString(),
      quantity: Number(quantities[index]),
    }));

    const newConsignedSchema = createConsignedSchema.parse({
      customerId,
      wines: winesOnConsigned,
    });

    const response = await fetch(`${process.env.API_BASE_URL}/consigned`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        customerId: newConsignedSchema.customerId,
        wines: newConsignedSchema.wines,
      }),
    });

    if (!response.ok) {
      const result = await response.json();

      console.log(result);
      return ActionsResponse.onError({
        err: new Error(result.message),
        status: "ERROR",
        payload: formData,
      });
    }

    return ActionsResponse.onSuccess({
      message: "Consignado criado com sucesso!",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return ActionsResponse.onError({
        err: error,
        status: "ERROR",
        payload: formData,
      });
    }

    return ActionsResponse.onError({
      err: error,
      status: "ERROR",
      payload: formData,
    });
  }
  revalidatePath("/consignados");
}
