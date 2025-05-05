import { Separator } from "../ui/separator";
import { ButtonLogout } from "./button-logout";
import { Navigation } from "./navigation";

export function Sidebar() {
  return (
    <aside className="bg-[#f7f7f7] hidden md:block w-[220px] p-5 border border-zinc-200">
      <Navigation />
      <Separator />
      <ButtonLogout />
    </aside>
  );
}
