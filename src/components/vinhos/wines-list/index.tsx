import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Wine } from "@/interfaces/list-wines-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { EllipsisVertical, Pen } from "lucide-react";
import Link from "next/link";
import { DeleteWineButton } from "../delete-wine-button";

export function WinesList({ wines }: { wines: Wine[] }) {
  return (
    <TableBody>
      {wines.map((wine) => (
        <TableRow key={wine.id} className="py-10 text-sm text-zinc-800">
          <TableCell>{wine.name}</TableCell>
          <TableCell>{wine.type}</TableCell>
          <TableCell>{wine.harvest}</TableCell>
          <TableCell>{wine.producer}</TableCell>
          <TableCell>{wine.country}</TableCell>
          <TableCell>
            {wine.price && formatCurrencyInput(wine.price.toString())}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger className="border  p-1 rounded-full cursor-pointer hover:bg-accent">
                <EllipsisVertical className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href={`/vinhos/editar/${wine.id}`}
                    className="text-sm w-full flex items-center gap-2"
                  >
                    <Pen className="size-3" /> Editar
                  </Link>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem>
                  <DeleteWineButton wineId={wine.id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
