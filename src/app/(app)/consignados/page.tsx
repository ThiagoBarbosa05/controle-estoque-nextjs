import { getUserFromToken } from "@/app/auth/get-token";
import { ConsignedList } from "@/app/(app)/consignados/consigned-list";
import { SearchConsigned } from "@/components/consignados/search-consigned";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";

export default async function ConsignadosPage(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const user = await getUserFromToken();

  const isAdmin = user.roles.includes("administrador");

  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">Consignados</h2>
      <Separator />
      <div className="flex w-full mt-6 flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <SearchConsigned />
        <Button asChild>
          {isAdmin && (
            <Link
              href={"/consignados/criar"}
              className={twMerge(
                "bg-[#0d6efd] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none"
              )}
            >
              Novo Consignado
            </Link>
          )}
        </Button>
      </div>

      <section className="mt-4">
        <Suspense key={searchTerm} fallback={<TableSkeleton />}>
          <ConsignedList searchTerm={searchTerm} />
        </Suspense>
      </section>
    </section>
  );
}
