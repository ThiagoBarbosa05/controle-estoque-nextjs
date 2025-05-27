import { Suspense } from "react";
import { HistorySkeleton } from "./history-skeleton";
import { ListHistory } from "./list-history";
import { getConsignedDetails } from "../inicio/consigned-details";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ consignedId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { consignedId } = await params;

  const consigned = await getConsignedDetails(consignedId);

  return {
    title: `Histórico | ${consigned?.consigned.customer.name}`,
    description: `Histórico de Consignado relacionado ao cliente ${consigned?.consigned.customer.name}`,
  };
}

export default async function ConsignedHistoryPage(props: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await props.params;

  return (
    <Suspense fallback={<HistorySkeleton />}>
      <ListHistory customerId={customerId} />
    </Suspense>
  );
}
