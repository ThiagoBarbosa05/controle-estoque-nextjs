import { Skeleton } from "@/components/ui/skeleton";

export function CountSkeleton() {
  return (
    <div className="w-full space-y-4 mt-6 h-full">
      <Skeleton className="shadow-sm w-full p-5 space-y-3 h-24 bg-white">
        <Skeleton className="w-[20%] h-5 bg-accent" />
        <Skeleton className="w-[60px] h-6 bg-accent" />
      </Skeleton>
      <Skeleton className="shadow-sm w-full p-5 space-y-3 h-24 bg-white">
        <Skeleton className="w-[20%] h-5 bg-accent" />
        <Skeleton className="w-[60px] h-6 bg-accent" />
      </Skeleton>
      <Skeleton className="shadow-sm w-full p-5 space-y-3 h-24 bg-white">
        <Skeleton className="w-[20%] h-5 bg-accent" />
        <Skeleton className="w-[60px] h-6 bg-accent" />
      </Skeleton>
    </div>
  );
}
