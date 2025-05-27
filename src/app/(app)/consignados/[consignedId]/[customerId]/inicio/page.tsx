import { ConsignedDetails, getConsignedDetails } from "./consigned-details";
import { Suspense } from "react";
import { DetailsSkeleton } from "./details-skeleton";
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
    title: `Consignado | ${consigned?.consigned.customer.name}`,
    description: `Consignado relacionado ao cliente ${consigned?.consigned.customer.name}`,
  };
}

export default async function ConsignedStartPage(props: {
  params: Promise<{ consignedId: string }>;
  searchParams?: Promise<{
    searchWine?: string;
  }>;
}) {
  const { consignedId } = await props.params;

  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.searchWine;

  return (
    <section className="w-full h-full">
      <Suspense fallback={<DetailsSkeleton />}>
        <ConsignedDetails consignedId={consignedId} searchTerm={searchTerm} />
      </Suspense>
    </section>
  );
}
