import { getToken } from "@/app/auth/get-token";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetConsignedHistoryResponse } from "@/interfaces/get-consigned-history-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

async function getConsignedHistory(
  customerId: string
): Promise<GetConsignedHistoryResponse | null> {
  const accessToken = await getToken();

  const response = await fetch(
    `${process.env.API_BASE_URL}/consigned/customer/${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: { tags: ["consigned-history"] },
    }
  );

  if (!response.ok) {
    const result = await response.json();
    console.log(result);
    return null;
  }

  return response.json();
}

export default async function ConsignedHistoryPage(props: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await props.params;

  const result = await getConsignedHistory(customerId);

  return (
    <section className="w-full space-y-3 mt-6 h-full">
      {!result || result?.consignedByCustomerId.length === 0 ? (
        <div className=" w-full text-center text-zinc-600">
          <p>Nenhum consignado encontrado</p>
        </div>
      ) : (
        <>
          {result.consignedByCustomerId.map((consigned) => (
            <Accordion
              className="border border-border rounded-md"
              key={consigned.id}
              type="single"
              collapsible
            >
              <AccordionItem value="item1">
                <AccordionTrigger className="p-5 hover:bg-accent justify-between">
                  <span className="text-sm flex flex-col">
                    <p className="flex items-center gap-1 text-sm text-zinc-600">
                      Data de criação:{" "}
                      <span className="text-[#7e1e2a]">
                        {format(consigned.createdAt, "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </span>
                    </p>
                    <div className="flex mt-2 items-center gap-2">
                      <span
                        className={twMerge(
                          "size-2 rounded-full bg-yellow-500",
                          consigned.status === "CONCLUÍDO" && "bg-green-500"
                        )}
                      />
                      <p className="text-sm text-zinc-600">
                        {consigned.status.replace("_", " ").toLowerCase()}
                        {consigned.status === "CONCLUÍDO" &&
                          ` em ${format(
                            consigned.completedIn,
                            "dd 'de' MMMM yyyy",
                            {
                              locale: ptBR,
                            }
                          )}`}
                      </p>
                    </div>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 flex flex-col items-center gap-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-sm">
                        <TableHead>Vinho</TableHead>
                        <TableHead>País</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Tamanho</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Saldo</TableHead>
                        <TableHead>Contagem</TableHead>
                        <TableHead>A Faturar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consigned.winesOnConsigned.map((wine) => (
                        <TableRow className="text-sm" key={wine.wines.id}>
                          <TableCell>{wine.wines.name}</TableCell>
                          <TableCell>{wine.wines.country}</TableCell>
                          <TableCell>{wine.wines.type}</TableCell>
                          <TableCell>{wine.wines.size}</TableCell>
                          <TableCell>
                            {formatCurrencyInput(wine.wines.price.toString())}
                          </TableCell>
                          <TableCell>{wine.balance}</TableCell>
                          <TableCell>{wine.count}</TableCell>
                          <TableCell>{wine.balance - wine.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </>
      )}
    </section>
  );
}
