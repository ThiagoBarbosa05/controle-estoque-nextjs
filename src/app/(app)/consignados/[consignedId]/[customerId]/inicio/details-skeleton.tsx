import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "@/components/ui/table-skeleton";

export function DetailsSkeleton() {
  return (
    <div className="w-full mt-6 h-full">
      <div className="space-y-2">
        <Skeleton className="w-[20%] bg-white h-6 shadow-sm" />
        <Skeleton className="w-[30%] bg-white h-5 shadow-sm" />
      </div>

      <div className="mt-5">
        <TableSkeleton />
      </div>
    </div>
  );
}
