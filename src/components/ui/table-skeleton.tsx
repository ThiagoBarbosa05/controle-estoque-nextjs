import { Separator } from "./separator";
import { Skeleton } from "./skeleton";

export async function TableSkeleton() {
  return (
    <div className="rounded-md shadow-sm overflow-hidden">
      <Skeleton className="w-full h-10 rounded-none flex items-center justify-between border-b p-2 bg-white">
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
      </Skeleton>
      <Skeleton className="w-full h-10 rounded-none flex items-center justify-between border-b p-2 bg-white">
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
      </Skeleton>
      <Skeleton className="w-full h-10 rounded-none flex items-center justify-between border-b p-2 bg-white">
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
      </Skeleton>

      <Skeleton className="w-full h-10 rounded-none flex items-center justify-between border-b p-2 bg-white">
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
      </Skeleton>
      <Skeleton className="w-full h-10 rounded-none flex items-center justify-between border-b p-2 bg-white">
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
        <Skeleton className="w-[120px] h-5 bg-accent" />
      </Skeleton>
    </div>
  );
}
