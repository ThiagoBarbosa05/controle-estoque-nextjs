import { StockList } from "@/components/estoque/stock-list";
import { Loading } from "@/components/ui/loading";
import { SearchWine } from "@/components/vinhos/search-wine";

import { Suspense } from "react";

export default async function EstoquePage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <section className="flex-1 flex flex-col">
      <h2 className="text-2xl sm:text-4xl font-medium">Controle de Estoque</h2>

      <SearchWine placeholder="Pesquise por um vinho ou cliente" />

      <Suspense
        key={searchParams?.page}
        fallback={
          <div className="flex-1 flex justify-center items-center">
            <Loading />
          </div>
        }
      >
        <StockList search={searchParams?.search} page={searchParams?.page} />
      </Suspense>
    </section>
  );
}
