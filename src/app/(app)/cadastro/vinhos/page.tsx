import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateNewWineForm } from "@/components/vinhos/form";
import Link from "next/link";

export default function CadastroVinhosPage() {
  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-4xl font-medium">Cadastro de vinhos</h2>
        <button className="bg-[#188754] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#03a679] text-white rounded-sm leading-none">
          Novo Vinho
        </button>
      </div>

      <CreateNewWineForm />

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-lg">Nome</TableHead>
              <TableHead className="font-bold text-lg">Tipo</TableHead>
              <TableHead className="font-bold text-lg">Safra</TableHead>
              <TableHead className="font-bold text-lg">Produtor</TableHead>
              <TableHead className="font-bold text-lg">País</TableHead>
              <TableHead className="font-bold text-lg">Preço</TableHead>
              <TableHead className="font-bold text-lg">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Vinho 1</TableCell>
              <TableCell>Tinto</TableCell>
              <TableCell>2018</TableCell>
              <TableCell>Vinícola A</TableCell>
              <TableCell>Argentina</TableCell>
              <TableCell>R$ 89,90</TableCell>
              <TableCell>
                <Link
                  className="border border-destructive text-destructive hover:bg-destructive hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Vinho B</TableCell>
              <TableCell>Tinto</TableCell>
              <TableCell>2018</TableCell>
              <TableCell>Vinícola A</TableCell>
              <TableCell>Argentina</TableCell>
              <TableCell>R$ 89,90</TableCell>
              <TableCell>
                <Link
                  className="border border-destructive text-destructive hover:bg-destructive hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Vinho C</TableCell>
              <TableCell>Tinto</TableCell>
              <TableCell>2018</TableCell>
              <TableCell>Vinícola A</TableCell>
              <TableCell>Argentina</TableCell>
              <TableCell>R$ 89,90</TableCell>
              <TableCell>
                <Link
                  className="border border-destructive text-destructive hover:bg-destructive hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Vinho D</TableCell>
              <TableCell>Tinto</TableCell>
              <TableCell>2018</TableCell>
              <TableCell>Vinícola A</TableCell>
              <TableCell>Argentina</TableCell>
              <TableCell>R$ 89,90</TableCell>
              <TableCell>
                <Link
                  className="border border-destructive text-destructive hover:bg-destructive hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="py-10 text-zinc-800">
              <TableCell>Vinho E</TableCell>
              <TableCell>Tinto</TableCell>
              <TableCell>2018</TableCell>
              <TableCell>Vinícola A</TableCell>
              <TableCell>Argentina</TableCell>
              <TableCell>R$ 89,90</TableCell>
              <TableCell>
                <Link
                  className="border border-destructive text-destructive hover:bg-destructive hover:text-white transition px-3 py-2 text-sm rounded-sm"
                  href=""
                >
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </section>
  );
}
