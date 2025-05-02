"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { startTransition } from "react";

export function SearchWine() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchCustomer = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mt-6 relative max-w-[480px]">
      <Input
        type="search"
        className=" text-sm "
        onChange={(e) => handleSearchCustomer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        placeholder="Pesquise um cliente"
        defaultValue={searchParams.get("search")?.toString()}
      />
      <Search className="size-5 text-zinc-400 absolute top-1/2 right-3 -translate-y-1/2" />
    </div>
  );
}
