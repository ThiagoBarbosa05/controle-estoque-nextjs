import { getToken } from "@/app/auth/get-token";
import { CreateNewConsignedForm } from "@/app/(app)/consignados/criar/create-new-consigned-form";
import { Separator } from "@/components/ui/separator";
import { ListCustomerResponse } from "@/interfaces/list-customer-response";
import { ListWinesResponse } from "@/interfaces/list-wines-response";
import { NewConsignedWrapper } from "./new-consigned-wrapper";
import { Suspense } from "react";
import { NewConsignedSkeleton } from "./new-consigned-skeleton";

export default async function CreateConsignedPage(props: {
  searchParams?: Promise<{
    searchCustomer?: string;
    searchWine?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchCustomerTerm = searchParams?.searchCustomer;
  const searchWineTerm = searchParams?.searchWine;

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">
        Criar novo consignado
      </h2>
      <Separator />

      <Suspense fallback={<NewConsignedSkeleton />}>
        <NewConsignedWrapper
          searchCustomerTerm={searchCustomerTerm}
          searchWineTerm={searchWineTerm}
        />
      </Suspense>
    </section>
  );
}
