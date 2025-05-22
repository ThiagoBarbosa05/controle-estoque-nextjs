import { cookies } from "next/headers";
import { Separator } from "../ui/separator";
import { ButtonLogout } from "./button-logout";
import { Navigation } from "./navigation";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/interfaces/token-payload";
import { ScanBarcode } from "lucide-react";

export async function Sidebar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const userRoles = jwtDecode(accessToken?.value ?? "") as TokenPayload;

  return (
    <aside className="bg-[#f7f7f7] fixed inset-0 z-20 hidden md:block w-[240px] py-5 border border-zinc-200">
      <h1 className="flex text-[#7e1e2a] px-5 font-semibold text-lg whitespace-nowrap items-center gap-2 pb-3">
        <ScanBarcode className="size-5" />
        Controle de estoque
      </h1>
      {/* <Separator /> */}
      <Navigation allowedRolesList={userRoles.roles} />
      <Separator />
      <ButtonLogout />
    </aside>
  );
}
