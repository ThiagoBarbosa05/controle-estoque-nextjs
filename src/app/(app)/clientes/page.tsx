import { CustomerList } from "@/components/clientes/customer-list";
import { CreateNewCustomerForm } from "@/components/clientes/form";
import { ToggleForm } from "@/components/clientes/form/toggle-form";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ClientesPage() {
  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-xl sm:text-4xl font-medium">
          Gerenciamento de Clientes
        </h2>
        <ToggleForm />
      </div>

      <CreateNewCustomerForm />

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base sm:text-lg">
                Nome
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Contato
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Email
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Telefone
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <CustomerList />
        </Table>
      </section>
    </section>
  );
}
