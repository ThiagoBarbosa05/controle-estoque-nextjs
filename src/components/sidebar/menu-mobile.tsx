import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Navigation } from "./navigation";

export function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden">
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="px-5 pt-6" side="left">
        <SheetHeader className="border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
