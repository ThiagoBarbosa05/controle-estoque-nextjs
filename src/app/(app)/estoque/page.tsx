import { StockList } from "@/app/(app)/estoque/stokc-list";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

import { Suspense } from "react";
import { SearchWine } from "../vinhos/search-wine";
import { TableSkeleton } from "@/components/ui/table-skeleton";

export const metadata: Metadata = {
  title: "Controle de Estoque",
  description: "Estoque de vinhos dos consignados",
};

export default async function EstoquePage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  console.log(searchParams?.page);

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">
        Controle de Estoque
      </h2>
      <Separator />

      <div className="mt-6">
        <SearchWine placeholder="Pesquise por um vinho ou cliente" />
      </div>
      <section className="mt-4">
        <Suspense key={searchParams?.search} fallback={<TableSkeleton />}>
          <StockList search={searchParams?.search} page={searchParams?.page} />
        </Suspense>
      </section>
    </section>
  );
}
