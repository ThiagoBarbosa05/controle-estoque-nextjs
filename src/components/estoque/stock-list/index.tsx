import { getToken } from "@/app/auth/get-token";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListWineMetricsResponse } from "@/interfaces/list-wine-metrics-response";
import { format } from "date-fns";
import Link from "next/link";

interface StockListProps {
  page?: string;
  search?: string;
}

async function listWineMetrics(
  page?: string,
  search?: string
): Promise<ListWineMetricsResponse> {
  const accessToken = await getToken();

  const url = page
    ? `${process.env.API_BASE_URL}/metrics/wines?page=${Number(page)}${
        search ? `&search=${search}` : ""
      }`
    : `${process.env.API_BASE_URL}/metrics/wines${
        search ? `?search=${search}` : ""
      }`;

  console.log(url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.log(res.status);
    const message = await res.json();
    console.log(message);
    throw new Error(message);
  }

  return res.json();
}

export async function StockList({ page, search }: StockListProps) {
  const wineMetricsList = await listWineMetrics(page, search);

  const totalPages = Math.ceil(
    wineMetricsList.total / wineMetricsList.pageSize
  );

  return (
    <section className="mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-sm">Vinho</TableHead>
            <TableHead className="font-bold text-sm">Cliente</TableHead>
            <TableHead className="font-bold text-sm">Quantidade</TableHead>
            <TableHead className="font-bold text-sm">
              Última atualização
            </TableHead>
            <TableHead className="font-bold text-sm">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wineMetricsList.items.length <= 0 ? (
            <TableRow>
              <TableCell>Nenhum vinho encontrado ou cliente</TableCell>
            </TableRow>
          ) : (
            <>
              {wineMetricsList.items.map((item, index) => (
                <TableRow
                  key={item.wineId + index}
                  className="py-10 text-zinc-800 text-sm"
                >
                  <TableCell>{item.wineName}</TableCell>
                  <TableCell>{item.customerName}</TableCell>
                  <TableCell>{item.totalBalance}</TableCell>
                  <TableCell>
                    {format(item.lastUpdated, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <Link
                      className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                      href=""
                    >
                      Histórico
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>

      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/estoque?page=${
                Number(page) && Number(page) > 1 ? Number(page) - 1 : 1
              }${search ? `&search=${search}` : ""}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/estoque?page=${
                Number(page) && Number(page) < totalPages
                  ? Number(page) + 1
                  : !page
                  ? 2
                  : totalPages
              }${search ? `&search=${search}` : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
