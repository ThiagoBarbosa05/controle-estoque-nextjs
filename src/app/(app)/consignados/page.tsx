import { ConsignedList } from "@/components/consignados/consigned-list";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function ConsignadosPage() {
  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-xl sm:text-4xl font-medium">Consignados</h2>
        <Link
          href={"/consignados/criar"}
          className={
            "bg-[#0d6efd] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none"
          }
        >
          Novo Consignado
        </Link>
      </div>

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
          <ConsignedList />
        </Table>
      </section>
    </section>
  );
}
