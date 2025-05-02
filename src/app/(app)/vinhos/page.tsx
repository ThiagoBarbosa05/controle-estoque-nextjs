import { getToken } from "@/app/auth/get-token";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loading } from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteUserButton } from "@/components/usuarios/delete-user-button";
import { DeleteWineButton } from "@/components/vinhos/delete-wine-button";
import { SearchWine } from "@/components/vinhos/search-wine";
import { WinesList } from "@/components/vinhos/wines-list";

import { ListWinesResponse } from "@/interfaces/list-wines-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { EllipsisVertical, Pen, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function listWines(searchTerm?: string): Promise<ListWinesResponse> {
  const accessToken = await getToken();
  const res = await fetch(
    searchTerm
      ? `${process.env.API_BASE_URL}/wines?search=${searchTerm}`
      : `${process.env.API_BASE_URL}/wines`,
    {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    console.log(res.status);
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function CadastroVinhosPage(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  const result = await listWines(searchTerm);

  return (
    <section>
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-4xl font-medium">Cadastro de vinhos</h2>
        <Link
          href={"/vinhos/criar"}
          className="bg-[#188754] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#03a679] text-white rounded-sm leading-none"
        >
          Novo Vinho
        </Link>
      </div>

      <SearchWine />

      <section className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-sm">Nome</TableHead>
              <TableHead className="font-bold text-sm">Tipo</TableHead>
              <TableHead className="font-bold text-sm">Safra</TableHead>
              <TableHead className="font-bold text-sm">Produtor</TableHead>
              <TableHead className="font-bold text-sm">País</TableHead>
              <TableHead className="font-bold text-sm">Preço</TableHead>
              <TableHead className="font-bold text-sm">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense key={searchTerm} fallback={<div>Loading.....</div>}>
            <WinesList wines={result.wines} />
          </Suspense>
        </Table>
      </section>
    </section>
  );
}
