import { getToken, getUserFromToken } from "@/app/auth/get-token";
import { HandleWineBalance } from "@/components/consignados/consigned-list/handle-wine-balance";
import { AddNewWine } from "@/components/consignados/form/add-new-wine";

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
): Promise<GetConsignedDetailsResponse | null> {
  const accessToken = await getToken();

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

  if (response.ok) {
    return response.json();
  }
  return response.json();
}

export default async function ConsignedStartPage(props: {
  params: Promise<{ consignedId: string }>;
  searchParams?: Promise<{
    searchWine?: string;
  }>;
}) {
  const { consignedId } = await props.params;

  const result = await getConsignedDetails(consignedId);
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.searchWine;

  const user = await getUserFromToken();
  const isAdmin = user.roles.includes("administrador");

  return (
    <section className="w-full h-full">
      {!result ? (
        <div className="mt-6 text-center text-zinc-600">
          <p>Nenhum consignado encontrado</p>
        </div>
      ) : (
        <>
          <div className="flex mt-6  mb-5 items-center  sm:items-start gap-2 sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-700">Cliente: </span>
                <h4 className="text-[#93173c] text-sm font-semibold">
                  {result.consigned.customer.name}
                </h4>
              </div>
              <div className="text-sm mt-2 text-zinc-700">
                Data de criação:{" "}
                <span className="text-[#93173c]">
                  {format(
                    new Date(result.consigned.createdAt),
                    "dd 'de' MMMM yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                </span>
              </div>
            </div>
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
              {result.consigned.winesOnConsigned.map((wine) => (
                <TableRow
                  className="text-sm"
                  key={wine.consignedId + wine.wineId}
                >
                  <TableCell>{wine.wines.name}</TableCell>
                  <TableCell>{wine.wines.type}</TableCell>
                  <TableCell>{wine.wines.country}</TableCell>
                  <TableCell>{wine.wines.size}</TableCell>
                  <TableCell>
                    {formatCurrencyInput(wine.wines.price.toString())}
                  </TableCell>
                  <TableCell className="min-w-[160px]">
                    {isAdmin ? (
                      <HandleWineBalance
                        consignedId={consignedId}
                        wineId={wine.wineId}
                        wineBalance={wine.balance}
                        customerId={result.consigned.customer.id}
                      />
                    ) : (
                      wine.balance
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {isAdmin && <AddNewWine searchTerm={searchTerm} result={result} />}
    </section>
  );
}
