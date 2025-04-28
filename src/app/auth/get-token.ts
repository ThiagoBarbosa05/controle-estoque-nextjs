"use server"

import { cookies } from "next/headers"

export async function  getToken() {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get("access_token")

    return accessToken?.value
}