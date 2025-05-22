import { Skeleton } from "@/components/ui/skeleton";

export function MetricsSkeleton() {
  return (
    <div className="grid mt-5 grid-cols-1 lg:grid-cols-3 gap-5">
      <Skeleton className="w-full h-[160px]  shadow-sm" />
      <Skeleton className="w-full h-[160px]  shadow-sm" />
      <Skeleton className="w-full h-[160px]  shadow-sm" />
    </div>
  );
}
