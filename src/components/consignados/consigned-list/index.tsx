"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useConsignedStore } from "@/store/consigned-store";
import Link from "next/link";

export function ConsignedList() {
  const { consigned: consignedList } = useConsignedStore();

  return (
    <TableBody>
      {consignedList.map((consigned) => (
        <TableRow key={consigned.id} className="py-10 text-zinc-800">
          <TableCell>{consigned.customerName}</TableCell>
          <TableCell>
            {consigned.wines.length > 0 &&
              consigned.wines.reduce((acc, wine) => acc + wine.quantity, 0)}
          </TableCell>
          <TableCell>{consigned.createdAt?.toString() ?? ""}</TableCell>
          <TableCell>{consigned.updatedAt?.toString() ?? ""}</TableCell>
          <TableCell>
            <Link
              className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
              href=""
            >
              Ver Detalhes
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
