"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchCustomer() {
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
    <div className="relative flex-1 max-w-[480px]">
      <Input
        type="text"
        className="text-sm bg-white pr-10"
        onChange={(e) => handleSearchCustomer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        placeholder="Busque por um cliente"
        defaultValue={searchParams.get("search")?.toString()}
      />

      <Search className="size-5 text-zinc-400 absolute top-1/2 right-3 -translate-y-1/2" />
    </div>
  );
}
