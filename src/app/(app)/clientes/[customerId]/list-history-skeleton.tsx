import { Skeleton } from "@/components/ui/skeleton";

export function ListHistorySkeleton() {
  return (
    <div className="w-full space-y-3 mt-6 h-full">
      <Skeleton className="w-[120px] h-7 bg-white shadow-sm" />

      <Skeleton className="w-full h-[88px] space-y-2 bg-white shadow-sm p-5">
        <Skeleton className="w-[20%] h-5" />
        <Skeleton className="w-[25%] h-5" />
      </Skeleton>
      <Skeleton className="w-full h-[88px] space-y-2 bg-white shadow-sm p-5">
        <Skeleton className="w-[20%] h-5" />
        <Skeleton className="w-[25%] h-5" />
      </Skeleton>
      <Skeleton className="w-full h-[88px] space-y-2 bg-white shadow-sm p-5">
        <Skeleton className="w-[20%] h-5" />
        <Skeleton className="w-[25%] h-5" />
      </Skeleton>
    </div>
  );
}
