import { Separator } from "@/components/ui/separator";

import { ListHistory } from "../../consignados/[consignedId]/[customerId]/historico/list-history";
import { Suspense } from "react";
import { CustomerDetails, getCustomerDetails } from "./customer-details";
import { CustomerDetailsSkeleton } from "./customer-details-skeleton";
import { ListHistorySkeleton } from "./list-history-skeleton";
import { Metadata, ResolvingMetadata } from "next";

type Params = Promise<{ customerId: string }>;

type Props = {
  params: Promise<{ customerId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { customerId } = await params;

  const customer = await getCustomerDetails(customerId);

  return {
    title: `Cliente | ${customer.customer?.name}`,
    description: `Detalhes do cliente ${customer.customer?.name}`,
  };
}

export default async function CustomerDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { customerId } = await params;

  return (
    <section>
      <Suspense fallback={<CustomerDetailsSkeleton />}>
        <CustomerDetails customerId={customerId} />
      </Suspense>
      <Separator />

      <Suspense fallback={<ListHistorySkeleton />}>
        <ListHistory customerId={customerId} />
      </Suspense>
    </section>
  );
}
