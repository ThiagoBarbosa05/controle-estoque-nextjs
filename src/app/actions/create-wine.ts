"use server";

import { z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { getToken } from "../auth/get-token";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const wineFormSchema = z.object({
  name: z.string().min(1, { message: "Insira o nome do vinho" }),
  harvest: z.coerce.number().optional().nullable(),
  type: z.string().min(1, { message: "Insira o tipo do vinho" }),
  price: z.string().min(1, { message: "Insira o preço do vinho" }),
  producer: z.string().optional(),
  country: z.string().min(1, { message: "Insira o país do vinho" }),
  size: z.string().min(1, { message: "Insira o tamanho do vinho" }),
});

export async function createWine(formState: FormState, formData: FormData) {
  try {
    const accessToken = await getToken();

    const wineSchema = wineFormSchema.parse(Object.fromEntries(formData));

    const parsedPrice = parseFloat(
      wineSchema.price.replace("R$", "").replace(/\s/g, "").replace(",", ".")
    );

    const response = await fetch(`${process.env.API_BASE_URL}/wines`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...wineSchema,
        price: parsedPrice,
        harvest: wineSchema.harvest ? wineSchema.harvest : null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.error || "Erro ao criar vinho");
    }
  } catch (error) {
    return ActionsResponse.onError({
      err: error,
      status: "ERROR",
      payload: formData,
    });
  }

  revalidatePath("/vinhos");
  revalidateTag("dashboard-metrics");
  redirect("/vinhos");
}
