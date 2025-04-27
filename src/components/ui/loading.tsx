import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="w-full flex items-center justify-center flex-1">
      <span>
        <LoaderCircle className="animate-spin size-10 text-[#7e1e2a]" />
      </span>
    </div>
  );
}
