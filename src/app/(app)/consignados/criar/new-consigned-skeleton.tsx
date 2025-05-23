import { Skeleton } from "@/components/ui/skeleton";

export function NewConsignedSkeleton() {
  return (
    <div className="grid max-w-[540px] grid-cols-1 sm:grid-cols-1 mt-6 gap-5">
      <div>
        <Skeleton className="w-16 h-6 mb-2 shadow-sm bg-white" />
        <Skeleton className="w-full max-w-[540px] h-9 shadow-sm bg-white" />
      </div>
      <div className="mt-5">
        <Skeleton className="w-16 h-6 mb-2 shadow-sm bg-white" />
        <Skeleton className="w-full max-w-[540px] h-9 shadow-sm bg-white" />
      </div>
    </div>
  );
}
