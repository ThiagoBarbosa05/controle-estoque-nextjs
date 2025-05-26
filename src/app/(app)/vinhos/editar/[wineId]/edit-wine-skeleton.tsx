import { Skeleton } from "@/components/ui/skeleton";

export function EditWineSkeleton() {
  return (
    <div className="mt-6 border min-h-[396px] border-zinc-300 p-4 rounded-md grid grid-cols-1 sm:grid-cols-2  gap-5">
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
  );
}
