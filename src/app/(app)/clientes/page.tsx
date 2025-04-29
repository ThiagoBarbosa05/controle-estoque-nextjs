import { CustomerList } from "@/components/clientes/customer-list";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function ClientesPage() {
  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-xl sm:text-4xl font-medium">
          Gerenciamento de Clientes
        </h2>
        <Link
          href="/clientes/criar"
          className="bg-[#0d6efd] whitespace-nowrap sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none"
        >
          Criar Novo
        </Link>
      </div>

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-sm">Nome</TableHead>
              <TableHead className="font-bold text-sm">Contato</TableHead>
              <TableHead className="font-bold text-sm">Email</TableHead>
              <TableHead className="font-bold text-sm">Telefone</TableHead>
              <TableHead className="font-bold text-sm">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <CustomerList />
        </Table>
      </section>
    </section>
  );
}
