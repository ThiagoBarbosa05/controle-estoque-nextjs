import { Suspense } from "react";
import { WineCountWrapper } from "./wine-count-wrapper";
import { CountSkeleton } from "./count-skeleton";
import { Metadata, ResolvingMetadata } from "next";
import { getConsignedDetails } from "../inicio/consigned-details";

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
    title: `Contagem | ${consigned?.consigned.customer.name}`,
    description: `Contagem de vinhos do consignado relacionado ao cliente ${consigned?.consigned.customer.name}`,
  };
}

export default async function ConsignedCountPage(props: {
  params: Promise<{ consignedId: string }>;
}) {
  const { consignedId } = await props.params;

  return (
    <Suspense fallback={<CountSkeleton />}>
      <WineCountWrapper consignedId={consignedId} />
    </Suspense>
  );
}
