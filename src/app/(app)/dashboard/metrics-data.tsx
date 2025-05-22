import { getToken } from "@/app/auth/get-token";
import { Metrics } from "@/interfaces/metrics-response";
import { CardCustomer } from "./card-customer";
import { CardWine } from "./card-wine";
import { CardWinesOnConsigned } from "./card-wines-on-consigned";

async function getDashboardMetrics(): Promise<Metrics> {
  const accessToken = await getToken();

  const response = await fetch(`${process.env.API_BASE_URL}/metrics`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
    next: { tags: ["dashboard-metrics"] },
  });

  return response.json();
}

export async function MetricsData() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="grid mt-5 grid-cols-1 lg:grid-cols-3 gap-5">
      <CardCustomer customersQuantity={metrics.count ?? 0} />

      <CardWine winesQuantity={metrics.winesQuantity ?? 0} />
      <CardWinesOnConsigned winesOnConsigned={metrics.winesOnConsigned ?? 0} />
    </div>
  );
}
