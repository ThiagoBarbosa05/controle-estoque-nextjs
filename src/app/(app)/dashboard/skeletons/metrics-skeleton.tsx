import { Skeleton } from "@/components/ui/skeleton";

export function MetricsSkeleton() {
  return (
    <div className="grid mt-5 grid-cols-1 lg:grid-cols-3 gap-5">
      <Skeleton className="w-full h-[160px] space-y-5 p-5 bg-white shadow-sm">
        <Skeleton className="w-[20%] h-5 bg-accent" />
        <Skeleton className="w-[25%] h-20 bg-accent" />
      </Skeleton>
      <Skeleton className="w-full h-[160px] space-y-5 p-5 bg-white shadow-sm">
        <Skeleton className="w-[20%] h-5 bg-accent" />
        <Skeleton className="w-[25%] h-20 bg-accent" />
      </Skeleton>
      <Skeleton className="w-full h-[160px] space-y-5 p-5 bg-white shadow-sm">
        <Skeleton className="w-[20%] h-5 bg-accent" />
        <Skeleton className="w-[25%] h-20 bg-accent" />
      </Skeleton>
    </div>
  );
}
