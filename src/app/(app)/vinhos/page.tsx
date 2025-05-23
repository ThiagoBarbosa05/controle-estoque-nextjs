import { getToken } from "@/app/auth/get-token";
import { Separator } from "@/components/ui/separator";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { SearchWine } from "@/components/vinhos/search-wine";

import { ListWinesResponse } from "@/interfaces/list-wines-response";

import Link from "next/link";
import { ListWines } from "./list-wines";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Button } from "@/components/ui/button";

export default async function CadastroVinhosPage(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">
        Cadastro de vinhos
      </h2>
      <Separator />

      <div className="flex mt-6 w-full items-center justify-between gap-4">
        <SearchWine />
        <Button asChild>
          <Link href={"/vinhos/criar"}>Novo Vinho</Link>
        </Button>
      </div>

      <Suspense key={searchTerm} fallback={<TableSkeleton />}>
        <ListWines searchTerm={searchTerm} />
      </Suspense>
    </section>
  );
}
