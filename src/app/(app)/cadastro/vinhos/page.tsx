import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateNewWineForm } from "@/components/vinhos/form";
import { WinesList } from "@/components/vinhos/wines-list";

export default function CadastroVinhosPage() {
  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-4xl font-medium">Cadastro de vinhos</h2>
        <button className="bg-[#188754] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#03a679] text-white rounded-sm leading-none">
          Novo Vinho
        </button>
      </div>

      <CreateNewWineForm />

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base sm:text-lg">
                Nome
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Tipo
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Safra
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Produtor
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                País
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Preço
              </TableHead>
              <TableHead className="font-bold text-base sm:text-lg">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <WinesList />
        </Table>
      </section>
    </section>
  );
}
