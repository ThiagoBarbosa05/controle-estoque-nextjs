import { Skeleton } from "@/components/ui/skeleton";

export function HistorySkeleton() {
  return (
    <div className="w-full space-y-3 mt-6 h-full">
      <Skeleton className="w-full h-[88px] p-5 bg-white shadow-sm space-y-2">
        <Skeleton className="w-[20%] h-5" />
        <Skeleton className="w-[30%] h-6" />
      </Skeleton>
      <Skeleton className="w-full h-[88px] p-5 bg-white shadow-sm space-y-2">
        <Skeleton className="w-[20%] h-5" />
        <Skeleton className="w-[30%] h-6" />
      </Skeleton>
      <Skeleton className="w-full h-[88px] p-5 bg-white shadow-sm space-y-2">
        <Skeleton className="w-[20%] h-5" />
        <Skeleton className="w-[30%] h-6" />
      </Skeleton>
    </div>
  );
}
