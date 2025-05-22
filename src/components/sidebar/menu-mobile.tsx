import { Menu, ScanBarcode } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ButtonLogout } from "./button-logout";
import { NavigationMobile } from "./navigation-mobile";

export function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden rounded-sm">
        <Menu className="text-zinc-600 size-5 absolute top-5 right-5" />
      </SheetTrigger>
      <SheetContent className="px-5 pt-6" side="right">
        <SheetHeader className="border-b p-0">
          <SheetTitle className="flex text-[#7e1e2a] font-semibold text-base whitespace-nowrap items-center gap-2 pb-3">
            <ScanBarcode className="size-5" />
            Controle de estoque
          </SheetTitle>
        </SheetHeader>
        <NavigationMobile />
        <ButtonLogout />
      </SheetContent>
    </Sheet>
  );
}
