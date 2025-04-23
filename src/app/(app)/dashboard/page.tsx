import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <section>
      <h2 className="text-4xl font-medium">Dashboard</h2>
      {/* Resumo Dados */}
      <div className="grid mt-5 grid-cols-3 gap-5">
        <div className="p-4 text-white rounded-lg bg-[#0d6efd]">
          <p className="text-xl mb-2 min-h-12">Total de Clientes</p>

          <span className="text-6xl font-light">5</span>
        </div>

        <div className="p-4 text-white rounded-lg bg-[#188754]">
          <p className="text-xl mb-2 min-h-12">Total de Vinhos</p>

          <span className="text-6xl font-light">25</span>
        </div>

        <div className="p-4 text-white rounded-lg bg-[#0cc9ef]">
          <p className="text-xl mb-2 min-h-12">Total em Consignação</p>

          <span className="text-6xl font-light">105</span>
        </div>
      </div>
      <section className="mt-6">
        <h3 className="text-3xl py-6">Resumo por Cliente</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-lg">Cliente</TableHead>
              <TableHead className="font-bold text-lg">
                Tipos de Vinhos
              </TableHead>
              <TableHead className="font-bold text-lg">
                Total Garrafas
              </TableHead>
              <TableHead className="font-bold text-lg">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 1</TableCell>
              <TableCell>12</TableCell>
              <TableCell>27</TableCell>
              <TableCell>
                <Link
                  className="border border-[#93173c] text-[#93173c] hover:bg-[#93173c] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Detalhes
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 2</TableCell>
              <TableCell>15</TableCell>
              <TableCell>45</TableCell>
              <TableCell>
                <Link
                  className="border border-[#93173c] text-[#93173c] hover:bg-[#93173c] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Detalhes
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 3</TableCell>
              <TableCell>15</TableCell>
              <TableCell>45</TableCell>
              <TableCell>
                <Link
                  className="border border-[#93173c] text-[#93173c] hover:bg-[#93173c] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Detalhes
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 4</TableCell>
              <TableCell>15</TableCell>
              <TableCell>45</TableCell>
              <TableCell>
                <Link
                  className="border border-[#93173c] text-[#93173c] hover:bg-[#93173c] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Detalhes
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </section>
  );
}
