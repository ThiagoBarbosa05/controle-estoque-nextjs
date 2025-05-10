import { cookies } from "next/headers";
import { Separator } from "../ui/separator";
import { ButtonLogout } from "./button-logout";
import { Navigation } from "./navigation";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/interfaces/token-payload";

export async function Sidebar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const userRoles = jwtDecode(accessToken?.value ?? "") as TokenPayload;

  return (
    <aside className="bg-[#f7f7f7] hidden md:block w-[220px] p-5 border border-zinc-200">
      <Navigation allowedRolesList={userRoles.roles} />
      <Separator />
      <ButtonLogout />
    </aside>
  );
}
