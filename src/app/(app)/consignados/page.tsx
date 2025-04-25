import { ConsignedList } from "@/components/consignados/consigned-list";
import { CreateNewConsignedForm } from "@/components/consignados/form";

import { ToggleForm } from "@/components/consignados/form/toggle-form";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ConsignadosPage() {
  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-xl sm:text-4xl font-medium">Consignados</h2>
        <ToggleForm />
      </div>

      <CreateNewConsignedForm />

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base sm:text-lg">
                Cliente
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Total de vinhos
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Data de Criação
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Última Atualização
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <ConsignedList />
        </Table>
      </section>
    </section>
  );
}
