import { getUserFromToken } from "@/app/auth/get-token";
import { ConsignedList } from "@/components/consignados/consigned-list";
import { SearchConsigned } from "@/components/consignados/search-consigned";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default async function ConsignadosPage(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const user = await getUserFromToken();

  const isAdmin = user.roles.includes("administrador");

  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-xl sm:text-4xl font-medium">Consignados</h2>
        {isAdmin && (
          <Link
            href={"/consignados/criar"}
            className={twMerge(
              "bg-[#0d6efd] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none"
            )}
          >
            Novo Consignado
          </Link>
        )}
      </div>

      <SearchConsigned />

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-sm">Cliente</TableHead>
              <TableHead className="font-bold text-sm">
                Total de vinhos
              </TableHead>
              <TableHead className="font-bold text-sm">
                Data de Criação
              </TableHead>
              <TableHead className="font-bold text-sm">
                Última Atualização
              </TableHead>
              <TableHead className="font-bold text-sm">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <ConsignedList searchTerm={searchTerm} />
        </Table>
      </section>
    </section>
  );
}
