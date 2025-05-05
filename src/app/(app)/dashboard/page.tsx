import { getToken } from "@/app/auth/get-token";
import { CardCustomer } from "@/components/dashboard/card-customer";
import { CardWine } from "@/components/dashboard/card-wine";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListCustomerSummaryResponse } from "@/interfaces/list-customer-summary-response";
import { Metrics } from "@/interfaces/metrics-response";
import Link from "next/link";

async function getDashboardMetrics(): Promise<Metrics> {
  const accessToken = await getToken();

  const response = await fetch(`${process.env.API_BASE_URL}/metrics`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
    next: { tags: ["dashboard-metrics"] },
  });

  return response.json();
}

async function listCustomerSummary(): Promise<ListCustomerSummaryResponse> {
  const accessToken = await getToken();

  const response = await fetch(`${process.env.API_BASE_URL}/summary`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
    next: { tags: ["dashboard-metrics"] },
  });

  return response.json();
}

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  const { summary } = await listCustomerSummary();

  return (
    <section>
      <h2 className="text-2xl sm:text-4xl font-medium">Dashboard</h2>
      {/* Resumo Dados */}
      <div className="grid mt-5 grid-cols-1 sm:grid-cols-3 gap-5">
        <CardCustomer customersQuantity={metrics.count ?? 0} />

        <CardWine winesQuantity={metrics.winesQuantity ?? 0} />

        <div className="p-4 text-white rounded-lg bg-[#0cc9ef]">
          <p className="text-lg sm:text-xl mb-2 min-h-12">
            Total em Consignação
          </p>

          <span className="text-4xl sm:text-6xl font-light">
            {metrics.winesOnConsigned ?? 0}
          </span>
        </div>
      </div>

      <section className="w-full mt-6">
        <h3 className="text-xl sm:text-3xl py-6">Resumo por Cliente</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold sm:text-lg">Cliente</TableHead>
                <TableHead className="font-bold sm:text-lg">
                  Tipos de Vinhos
                </TableHead>
                <TableHead className="font-bold sm:text-lg">
                  Total Garrafas
                </TableHead>
                <TableHead className="font-bold sm:text-lg">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.map((data) => (
                <TableRow key={data.customerId} className="py-10 text-zinc-800">
                  <TableCell>{data.customer}</TableCell>
                  <TableCell>{data.totalTypes}</TableCell>
                  <TableCell>{data.totalBalance}</TableCell>
                  <TableCell>
                    <Link
                      className="border border-[#93173c] text-[#93173c] hover:bg-[#93173c] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                      href=""
                    >
                      Ver Detalhes
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </section>
  );
}
