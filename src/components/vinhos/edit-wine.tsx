import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { WineForm } from "./form";

export default function EditWineSheet() {
  return (
    <Sheet>
      <SheetTrigger className="text-sm cursor-pointer w-full flex items-center gap-2"></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar vinho</SheetTitle>
        </SheetHeader>
        <WineForm />
      </SheetContent>
    </Sheet>
  );
}
