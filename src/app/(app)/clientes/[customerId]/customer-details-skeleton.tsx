import { Skeleton } from "@/components/ui/skeleton";

export function CustomerDetailsSkeleton() {
  return (
    <div className="pb-6">
      <Skeleton className="w-[15%] h-9 bg-white shadow-sm mb-2" />
      <Skeleton className="w-[10%] h-5 bg-white shadow-sm mb-1" />
      <Skeleton className="w-[9%] h-5 bg-white shadow-sm mb-1" />

      <div className="mt-4 max-w-[600px]">
        <Skeleton className="w-[64px] h-7 bg-white shadow-sm mb-1" />

        <div className="space-y-1 sm:grid sm:grid-cols-2 gap-x-5">
          <Skeleton className="w-full h-5 bg-white shadow-sm mb-1" />
          <Skeleton className="w-full h-5 bg-white shadow-sm mb-1" />
          <Skeleton className="w-full h-5 bg-white shadow-sm mb-1" />
          <Skeleton className="w-full h-5 bg-white shadow-sm mb-1" />
        </div>
      </div>
      <div className="mt-4 max-w-[600px]">
        <Skeleton className="w-[64px] h-7 bg-white shadow-sm mb-1" />

        <div className="space-y-1 sm:grid sm:grid-cols-2 gap-x-5">
          <Skeleton className="w-full h-5 bg-white shadow-sm mb-1" />
          <Skeleton className="w-full h-5 bg-white shadow-sm mb-1" />
          <Skeleton className="w-full h-5 bg-white shadow-sm mb-1" />
          <Skeleton className="w-full h-5 bg-white shadow-sm mb-1" />
        </div>
      </div>
    </div>
  );
}
