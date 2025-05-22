import { MenuMobile } from "@/components/sidebar/menu-mobile";
import { Separator } from "@/components/ui/separator";

import { MetricsData } from "./metrics-data";
import { CustomersSummary } from "./customers-summary";
import { MetricsSkeleton } from "./skeletons/metrics-skeleton";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";

export default async function DashboardPage() {
  return (
    <section>
      <div className="flex pb-3 items-center gap-2">
        <MenuMobile />
        <h2 className="text-lg sm:text-2xl font-medium">Dashboard</h2>
      </div>

      <Separator />
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsData />
      </Suspense>

      <section className="w-full mt-6">
        <h3 className="text-lg font-medium py-3">Resumo por cliente</h3>

        <Suspense fallback={<TableSkeleton />}>
          <CustomersSummary />
        </Suspense>
      </section>
    </section>
  );
}
