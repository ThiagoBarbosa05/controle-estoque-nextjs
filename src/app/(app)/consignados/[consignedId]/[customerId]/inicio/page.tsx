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

  return null;
}

export default async function ConsignedStartPage(props: {
  params: Promise<{ consignedId: string }>;
}) {
  const { consignedId } = await props.params;

  const result = await getConsignedDetails(consignedId);

  return (
    <section className="w-full h-full">
      {!result ? (
        <div className="mt-6 text-center text-zinc-600">
          <p>Nenhum consignado encontrado</p>
        </div>
      ) : (
        <>
          <div className="flex mt-6 sm:flex-row mb-5 justify-center items-center flex-col sm:items-start gap-2 sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-700">Cliente: </span>
                <h4 className="text-[#93173c] font-semibold">
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
            {/* <AddWine>
        <button className="bg-[#0d6efd] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none">
          Editar
        </button>
      </AddWine> */}
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
                  <TableCell>{wine.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </section>
  );
}
