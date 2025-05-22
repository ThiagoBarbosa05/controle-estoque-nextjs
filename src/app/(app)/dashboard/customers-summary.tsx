import { getToken } from "@/app/auth/get-token";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListCustomerSummaryResponse } from "@/interfaces/list-customer-summary-response";
import Link from "next/link";

async function listCustomerSummary(): Promise<ListCustomerSummaryResponse> {
  const accessToken = await getToken();

  const response = await fetch(`${process.env.API_BASE_URL}/summary`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
    next: { tags: ["customer-summary"] },
  });

  return response.json();
}

export async function CustomersSummary() {
  const { summary } = await listCustomerSummary();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-sm">Cliente</TableHead>
          <TableHead className="text-sm">Tipos de Vinhos</TableHead>
          <TableHead className="text-sm">Total Garrafas</TableHead>
          <TableHead className="text-sm">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {summary.map((data) => (
          <TableRow
            key={data.customerId}
            className="py-10 text-sm  text-zinc-800"
          >
            <TableCell>{data.customer}</TableCell>
            <TableCell>{data.totalTypes}</TableCell>
            <TableCell>{data.totalBalance}</TableCell>
            <TableCell>
              <Link
                className="text-[#93173c]  underline underline-offset-2 transition text-sm rounded-sm"
                href={`/consignados/${data.consignedId}/${data.customerId}/inicio`}
              >
                Detalhes
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
