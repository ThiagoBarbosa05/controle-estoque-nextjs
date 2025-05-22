"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { LoaderCircle, Search } from "lucide-react";

export function SearchConsigned() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSearchConsigned = useDebouncedCallback((term: string) => {
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
    <div className="relative flex-1 w-full max-w-[480px]">
      <Input
        type="text"
        className="text-sm bg-white"
        onChange={(e) => handleSearchConsigned(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        placeholder="Digite o nome do cliente do consignado"
        defaultValue={searchParams.get("search")?.toString()}
      />
      <Search className="size-5 text-zinc-400 absolute top-1/2 right-3 -translate-y-1/2" />
      {/* {isPending ? (
        <div className="text-sm absolute bottom-1/2 right-4 translate-y-1/2 text-[#93173c] mt-1">
          <LoaderCircle className="size-5  animate-spin" />
        </div>
      ) : (
        <Search className="size-5 text-zinc-400 absolute top-1/2 right-3 -translate-y-1/2" />
      )} */}
    </div>
  );
}
