import { ScanBarcode } from "lucide-react";
import { MenuMobile } from "../sidebar/menu-mobile";
import { Separator } from "../ui/separator";

export function Header() {
  return (
    <header className="w-full md:hidden flex items-center gap-2 px-5 py-4 border-b">
      <MenuMobile />

      <Separator orientation="vertical" />

      <h1 className="flex text-[#7e1e2a] font-semibold text-lg whitespace-nowrap items-center gap-2">
        <ScanBarcode className="size-5" />
        Controle de estoque
      </h1>
    </header>
  );
}
