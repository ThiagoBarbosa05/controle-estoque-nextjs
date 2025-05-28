import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { ListUsers } from "./list-users";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Button } from "@/components/ui/button";
import { SearchUser } from "./search-user";
import { Metadata } from "next";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Usuários",
  description: "Lista de usuários do sistema",
};

export default async function UsersPage(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">Usuários</h2>
      <Separator />

      <div className="flex mt-6 w-full items-center justify-between gap-4">
        <SearchUser />
        <Button asChild>
          <Link title="Criar Novo usuário" href="/usuarios/criar">
            <span className="hidden sm:block">Novo Usuário</span>
            <span className="block sm:hidden">
              <Plus className="sizer-5 text-white" strokeWidth={3} />
            </span>
          </Link>
        </Button>
      </div>

      <section className="mt-4">
        <Suspense key={searchTerm} fallback={<TableSkeleton />}>
          <ListUsers searchTerm={searchTerm} />
        </Suspense>
      </section>
    </section>
  );
}
