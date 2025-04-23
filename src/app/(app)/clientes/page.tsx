import { CreateNewCustomerForm } from "@/components/clientes/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function ClientesPage() {
  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-4xl font-medium">Gerenciamento de Clientes</h2>
        <button className="bg-[#0d6efd] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none">
          Novo Cliente
        </button>
      </div>

      <CreateNewCustomerForm />

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-lg">Nome</TableHead>
              <TableHead className="font-bold text-lg">Contato</TableHead>
              <TableHead className="font-bold text-lg">Email</TableHead>
              <TableHead className="font-bold text-lg">Telefone</TableHead>
              <TableHead className="font-bold text-lg">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 1</TableCell>
              <TableCell>Contato exemplo</TableCell>
              <TableCell>exemplo@email.com</TableCell>
              <TableCell>(11) 98765-4321</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Estoque
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 1</TableCell>
              <TableCell>Contato exemplo</TableCell>
              <TableCell>exemplo@email.com</TableCell>
              <TableCell>(11) 98765-4321</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Estoque
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 1</TableCell>
              <TableCell>Contato exemplo</TableCell>
              <TableCell>exemplo@email.com</TableCell>
              <TableCell>(11) 98765-4321</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Estoque
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 1</TableCell>
              <TableCell>Contato exemplo</TableCell>
              <TableCell>exemplo@email.com</TableCell>
              <TableCell>(11) 98765-4321</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Estoque
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Cliente 1</TableCell>
              <TableCell>Contato exemplo</TableCell>
              <TableCell>exemplo@email.com</TableCell>
              <TableCell>(11) 98765-4321</TableCell>
              <TableCell>
                <Link
                  className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Ver Estoque
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </section>
  );
}
