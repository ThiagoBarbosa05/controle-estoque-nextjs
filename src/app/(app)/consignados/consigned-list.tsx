import { getToken } from "@/app/auth/get-token";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListConsignedResponse } from "@/interfaces/list-consigned-response";
import { format } from "date-fns";
import Link from "next/link";

async function listConsigned(
  searchTerm?: string
): Promise<ListConsignedResponse> {
  const accessToken = await getToken();

  const url = searchTerm
    ? `${process.env.API_BASE_URL}/consigned?search=${searchTerm}`
    : `${process.env.API_BASE_URL}/consigned`;

  const response = await fetch(url, {
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

export async function ConsignedList({ searchTerm }: { searchTerm?: string }) {
  const result = await listConsigned(searchTerm);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-sm">Cliente</TableHead>
          <TableHead className="font-bold text-sm">Total de vinhos</TableHead>
          <TableHead className="font-bold text-sm">Data de Criação</TableHead>
          <TableHead className="font-bold text-sm">
            Última Atualização
          </TableHead>
          <TableHead className="font-bold text-sm">Ações</TableHead>
        </TableRow>
      </TableHeader>

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
                className="text-[#93173c]  underline underline-offset-2 transition text-sm rounded-sm"
                href={`/consignados/${consigned.id}/${consigned.customer.id}/inicio`}
              >
                Ver Detalhes
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
