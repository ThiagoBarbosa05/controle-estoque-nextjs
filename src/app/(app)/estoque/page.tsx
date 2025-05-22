import { StockList } from "@/components/estoque/stock-list";
import { Loading } from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
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
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">
        Controle de Estoque
      </h2>
      <Separator />

      <div className="mt-6">
        <SearchWine placeholder="Pesquise por um vinho ou cliente" />
      </div>

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
