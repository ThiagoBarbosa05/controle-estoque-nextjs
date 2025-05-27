"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchWine({ placeholder }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchWine = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex-1 relative max-w-[480px]">
      <Input
        type="text"
        className="text-sm bg-white"
        onChange={(e) => handleSearchWine(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        placeholder={placeholder ? placeholder : "Pesquise por um vinho"}
        defaultValue={searchParams.get("search")?.toString()}
      />

      <Search className="size-5 text-zinc-400 absolute top-1/2 right-3 -translate-y-1/2" />
    </div>
  );
}
