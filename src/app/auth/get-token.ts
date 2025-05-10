"use server";

import { TokenPayload } from "@/interfaces/token-payload";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token");

  return accessToken?.value;
}

export async function getUserFromToken() {
  const accessToken = await getToken();

  return jwtDecode(accessToken ?? "") as TokenPayload;
}
