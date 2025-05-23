import { Suspense } from "react";
import { HistorySkeleton } from "./history-skeleton";
import { ListHistory } from "./list-history";

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
