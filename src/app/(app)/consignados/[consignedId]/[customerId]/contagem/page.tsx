import { getToken } from "@/app/auth/get-token";
import { WineCountForm } from "@/components/consignados/form/count-wine";
import { GetConsignedDetailsResponse } from "@/interfaces/get-consigned-details-response";
import { Suspense } from "react";
import { WineCountWrapper } from "./wine-count-wrapper";
import { CountSkeleton } from "./count-skeleton";

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
