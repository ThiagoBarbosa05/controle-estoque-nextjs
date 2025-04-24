"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrencyInput } from "@/lib/format-currency";
import { useWineStore } from "@/store/wine-store";
import Link from "next/link";

export function WinesList() {
  const { wine: winesList } = useWineStore();

  return (
    <TableBody>
      {winesList.map((wine) => (
        <TableRow key={wine.id} className="py-10 text-zinc-800">
          <TableCell>{wine.name}</TableCell>
          <TableCell>{wine.type}</TableCell>
          <TableCell>{wine.harvest}</TableCell>
          <TableCell>{wine.producer}</TableCell>
          <TableCell>{wine.country}</TableCell>
          <TableCell>
            {wine.price && formatCurrencyInput(wine.price.toString())}
          </TableCell>
          <TableCell>
            <Link
              className="border border-destructive text-destructive hover:bg-destructive hover:text-white transition px-3 py-2 text-sm rounded-sm"
              href=""
            >
              Excluir
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
