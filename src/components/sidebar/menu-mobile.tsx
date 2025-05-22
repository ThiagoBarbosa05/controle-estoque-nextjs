import { Menu } from "lucide-react";
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
      <SheetTrigger className="md:hidden rounded-sm p-1 ">
        <Menu className="text-zinc-600 size-5" />
      </SheetTrigger>
      <SheetContent className="px-5 pt-6" side="left">
        <SheetHeader className="border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <NavigationMobile />
        <ButtonLogout />
      </SheetContent>
    </Sheet>
  );
}
