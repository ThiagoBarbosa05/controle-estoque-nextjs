"use server";

import { z } from "zod";
import { ActionsResponse, FormState } from "./error-handler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TokenPayload } from "@/interfaces/token-payload";
import { jwtDecode } from "jwt-decode";

const authenticateUserSchema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z.string({ message: "Esse campo é obrigatório" }),
});

export async function login(formState: FormState, formData: FormData) {
  let decodedToken: TokenPayload;

  try {
    const credentials = authenticateUserSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const response = await fetch(`${process.env.API_BASE_URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const result = await response.json();
      return ActionsResponse.onError({
        err: new Error(result.message),
        status: "ERROR",
        payload: formData,
      });
    }

    const result = await response.json();

    decodedToken = jwtDecode(result.accessToken) as TokenPayload;

    const cookieStore = await cookies();

    cookieStore.set("access_token", result.accessToken, {
      maxAge: 25200,
      httpOnly: true,
      path: "/",
    });
  } catch (error) {
    console.log("Error Login", error);
    return ActionsResponse.onError({
      err: error,
      status: "ERROR",
      payload: formData,
    });
  }
  const isSeller = decodedToken.roles.includes("vendedor");
  const isAdmin = decodedToken.roles.includes("administrador");
  const sellerRedirectUrl = isSeller ? "/consignados" : "/dashboard";
  const customerRedirectUrl = decodedToken.consigned
    ? `/consignados/${decodedToken.consigned}/${decodedToken.customerId}/inicio`
    : "/";

  redirect(
    isAdmin ? "/dashboard" : isSeller ? sellerRedirectUrl : customerRedirectUrl
  );
}
