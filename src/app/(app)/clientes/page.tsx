import { CustomerList } from "@/app/(app)/clientes/customer-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { TableSkeleton } from "@/components/ui/table-skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { SearchCustomer } from "./search-customer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Lista de clientes",
};

export default async function ClientesPage(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">Clientes</h2>

      <Separator />

      <div className="flex items-center gap-4 justify-between mt-6">
        <SearchCustomer />
        <Button type="button" asChild>
          <Link href="/clientes/criar">Criar Novo</Link>
        </Button>
      </div>
      <section className="mt-4">
        <Suspense key={searchTerm} fallback={<TableSkeleton />}>
          <CustomerList searchTerm={searchTerm} />
        </Suspense>
      </section>
    </section>
  );
}
