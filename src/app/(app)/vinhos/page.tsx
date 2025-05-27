import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { ListWines } from "./list-wines";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Button } from "@/components/ui/button";
import { SearchWine } from "./search-wine";
import { Metadata } from "next";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Vinhos",
  description: "Listagem de vinhos cadastrados",
};

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
          <Link href={"/vinhos/criar"} title="Criar novo vinho">
            <span className="hidden sm:block">Novo vinho</span>
            <span className="block sm:hidden">
              <Plus className="size-5 text-white" strokeWidth={3} />
            </span>
          </Link>
        </Button>
      </div>
      <section className="mt-4">
        <Suspense key={searchTerm} fallback={<TableSkeleton />}>
          <ListWines searchTerm={searchTerm} />
        </Suspense>
      </section>
    </section>
  );
}
