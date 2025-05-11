import { getToken, getUserFromToken } from "@/app/auth/get-token";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ListConsignedResponse } from "@/interfaces/list-consigned-response";
import { useConsignedStore } from "@/store/consigned-store";
import { format } from "date-fns";
import Link from "next/link";

async function listConsigned(): Promise<ListConsignedResponse> {
  const accessToken = await getToken();

  const response = await fetch(`${process.env.API_BASE_URL}/consigned`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },

    cache: "force-cache",
  });

  if (!response.ok) {
    const message = await response.json();
    console.log(message);
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function ConsignedList() {
  const result = await listConsigned();

  return (
    <TableBody>
      {result.consigned.map((consigned) => (
        <TableRow key={consigned.id} className="py-10 text-zinc-800 text-sm">
          <TableCell>{consigned.customer.name}</TableCell>
          <TableCell className="w-[100px]" align="center">
            {consigned.totalBalance ?? 0}
          </TableCell>
          <TableCell>{format(consigned.createdAt, "dd/MM/yyyy")}</TableCell>
          <TableCell>{format(consigned.updatedAt, "dd/MM/yyyy")}</TableCell>

          <TableCell>
            <Link
              className="border border-[#0d6efd]  text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
              href={`/consignados/${consigned.id}/${consigned.customer.id}/inicio`}
            >
              Ver Detalhes
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
