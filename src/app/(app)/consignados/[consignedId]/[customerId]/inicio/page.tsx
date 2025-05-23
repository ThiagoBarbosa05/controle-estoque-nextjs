import { ConsignedDetails } from "./consigned-details";
import { Suspense } from "react";
import { DetailsSkeleton } from "./details-skeleton";

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
