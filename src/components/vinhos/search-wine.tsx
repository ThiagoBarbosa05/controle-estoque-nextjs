"use client";

import { LoaderCircle, Search } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useTransition } from "react";

export function SearchWine() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSearchCustomer = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <div className="mt-6 relative max-w-[480px]">
      <Input
        type="text"
        className="text-sm"
        onChange={(e) => handleSearchCustomer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        placeholder="Pesquise por um vinho"
        defaultValue={searchParams.get("search")?.toString()}
      />
      {isPending ? (
        <div className="text-sm absolute bottom-1/2 right-4 translate-y-1/2 text-[#93173c] mt-1">
          <LoaderCircle className="size-5  animate-spin" />
        </div>
      ) : (
        <Search className="size-5 text-zinc-400 absolute top-1/2 right-3 -translate-y-1/2" />
      )}
    </div>
  );
}
