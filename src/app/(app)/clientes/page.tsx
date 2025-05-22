import { CustomerList } from "@/components/clientes/customer-list";
import { SearchCustomer } from "@/components/clientes/search-customer";
import { Separator } from "@/components/ui/separator";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default async function ClientesPage(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">Clientes</h2>

      <Separator />

      <div className="flex items-center gap-4 justify-between mt-6">
        <SearchCustomer />
        <Link
          href="/clientes/criar"
          className="bg-[#0d6efd] whitespace-nowrap sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none"
        >
          Criar Novo
        </Link>
      </div>

      <section className="mt-4">
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
          <CustomerList searchTerm={searchTerm} />
        </Table>
      </section>
    </section>
  );
}
