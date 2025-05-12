"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { LoaderCircle, Search } from "lucide-react";

export function SearchUser() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSearchUser = useDebouncedCallback((term: string) => {
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
        onChange={(e) => handleSearchUser(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        placeholder="Busque por um usuário"
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
