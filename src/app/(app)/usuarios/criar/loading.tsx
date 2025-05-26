import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="w-[220px] h-8 bg-white shadow-sm mb-3" />

      <div className="border-zinc-300  grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
        <div className="space-y-1">
          <Skeleton className="bg-white rounded-sm shadow-sm w-[10%] h-6" />
          <Skeleton className="bg-white rounded-sm shadow-sm w-full h-9" />
        </div>
        <div className="space-y-1">
          <Skeleton className="bg-white rounded-sm shadow-sm w-[10%] h-6" />
          <Skeleton className="bg-white rounded-sm shadow-sm w-full h-9" />
        </div>
        <div className="space-y-1">
          <Skeleton className="bg-white rounded-sm shadow-sm w-[10%] h-6" />
          <Skeleton className="bg-white rounded-sm shadow-sm w-full h-9" />
        </div>
        <div className="space-y-1">
          <Skeleton className="bg-white rounded-sm shadow-sm w-[10%] h-6" />
          <Skeleton className="bg-white rounded-sm shadow-sm w-full h-9" />
        </div>
        <div className="space-y-1">
          <Skeleton className="bg-white rounded-sm shadow-sm w-[10%] h-6" />
          <Skeleton className="bg-white rounded-sm shadow-sm w-full h-9" />
        </div>
        <div className="space-y-1">
          <Skeleton className="bg-white rounded-sm shadow-sm w-[10%] h-6" />
          <Skeleton className="bg-white rounded-sm shadow-sm w-full h-9" />
        </div>
      </div>
    </div>
  );
}
