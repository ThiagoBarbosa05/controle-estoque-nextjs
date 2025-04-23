import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function EstoquePage() {
  return (
    <section>
      <h2 className="text-4xl font-medium">Controle de Estoque</h2>

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-lg">Vinho</TableHead>
              <TableHead className="font-bold text-lg">Cliente</TableHead>
              <TableHead className="font-bold text-lg">Quantidade</TableHead>
              <TableHead className="font-bold text-lg">
                Última atualização
              </TableHead>
              <TableHead className="font-bold text-lg">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cabernet Sauvignon </TableCell>
              <TableCell>Restaurante A</TableCell>
              <TableCell>12</TableCell>
              <TableCell>2025-04-15</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Histórico
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cabernet Sauvignon </TableCell>
              <TableCell>Restaurante A</TableCell>
              <TableCell>12</TableCell>
              <TableCell>2025-04-15</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Histórico
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cabernet Sauvignon </TableCell>
              <TableCell>Restaurante A</TableCell>
              <TableCell>12</TableCell>
              <TableCell>2025-04-15</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Histórico
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cabernet Sauvignon </TableCell>
              <TableCell>Restaurante A</TableCell>
              <TableCell>12</TableCell>
              <TableCell>2025-04-15</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Histórico
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cabernet Sauvignon </TableCell>
              <TableCell>Restaurante A</TableCell>
              <TableCell>12</TableCell>
              <TableCell>2025-04-15</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Histórico
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </section>
  );
}
