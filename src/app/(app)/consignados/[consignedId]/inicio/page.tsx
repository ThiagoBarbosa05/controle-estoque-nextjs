import { getToken } from "@/app/auth/get-token";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetConsignedDetailsResponse } from "@/interfaces/get-consigned-details-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

async function getConsignedDetails(
  consignedId: string
): Promise<GetConsignedDetailsResponse> {
  const accessToken = await getToken();
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `${process.env.API_BASE_URL}/consigned/${consignedId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: { tags: ["consigned-details"] },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch consigned details");
  }

  return response.json();
}

export default async function ConsignedStartPage(props: {
  params: Promise<{ consignedId: string }>;
}) {
  const { consignedId } = await props.params;

  const { consigned } = await getConsignedDetails(consignedId);

  return (
    <section className="w-full h-full">
      <div className="flex items-center mt-6 gap-2">
        <span className="text-zinc-700">Cliente: </span>
        <h4 className="text-[#93173c] font-semibold">
          {consigned.customer.name}
        </h4>
      </div>
      <div className="text-sm mt-2 mb-6 text-zinc-700">
        Data de criação:{" "}
        <span className="text-[#93173c]">
          {format(new Date(consigned.createdAt), "dd 'de' MMMM yyyy", {
            locale: ptBR,
          })}
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="text-sm">
            <TableHead>Vinho</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>País</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consigned.winesOnConsigned.map((wine) => (
            <TableRow className="text-sm" key={wine.consignedId + wine.wineId}>
              <TableCell>{wine.wines.name}</TableCell>
              <TableCell>{wine.wines.type}</TableCell>
              <TableCell>{wine.wines.country}</TableCell>
              <TableCell>{wine.wines.size}</TableCell>
              <TableCell>
                {formatCurrencyInput(wine.wines.price.toString())}
              </TableCell>
              <TableCell>{wine.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
