import { Separator } from "./separator";
import { Skeleton } from "./skeleton";

export async function TableSkeleton() {
  return (
    <div className="rounded-md shadow-sm overflow-hidden">
      <Skeleton className="w-full h-10 rounded-none border-b " />
      <Skeleton className="w-full h-10 rounded-none border-b " />
      <Skeleton className="w-full h-10 rounded-none border-b " />
      <Skeleton className="w-full h-10 rounded-none border-b " />
      <Skeleton className="w-full h-10 rounded-none border-b " />
    </div>
  );
}
