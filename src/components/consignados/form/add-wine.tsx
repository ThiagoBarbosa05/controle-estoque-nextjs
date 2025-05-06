"use client";

import { addWinesOnConsigned } from "@/app/actions/add-wines-on-consigned";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wine } from "@/interfaces/list-wines-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useActionState, useState, useTransition } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";

export type WineState = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export function AddWine({
  children,
  wines,
  consigned,
  winesOnTheList,
}: {
  children: ReactNode;
  wines: Wine[];
  winesOnTheList: { wineId: string; quantity: number }[] | undefined;
  consigned: { id: string; customerId: string } | undefined;
}) {
  const [isPendingWine, startTransitionWine] = useTransition();
  const [wineList, setWineList] = useState<WineState[] | []>([]);

  const [formState, action, isPending] = useActionState(
    addWinesOnConsigned.bind(null, consigned!.customerId, winesOnTheList),
    EMPTY_FORM_STATE
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchWine = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("searchWine", term);
    } else {
      params.delete("searchWine");
    }

    startTransitionWine(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  function handleSelectWine(wine: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }) {
    const existingWine = wineList.find((w) => w.id === wine.id);

    if (existingWine) {
      toast.error("Vinho já adicionado", {
        description: existingWine.name,

        action: {
          label: "fechar",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }

    const wineBelongsConsigned = winesOnTheList?.find(
      (w) => w.wineId === wine.id
    );

    if (wineBelongsConsigned) {
      toast.error("Vinho já pertence ao consignado", {
        description: wine.name,
        action: {
          label: "fechar",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }

    setWineList([...wineList, wine]);
    replace(`${pathname}`);
  }

  function handleDeleteWine(wineId: string) {
    setWineList(wineList.filter((wine) => wine.id !== wineId));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="sm:min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Adicionar vinhos</SheetTitle>
        </SheetHeader>
        <form action={action} className="px-5">
          <div className="relative">
            <label htmlFor="wine">Vinhos*</label>

            <div className="relative">
              <Input
                id="wine"
                type="text"
                onChange={(e) => handleSearchWine(e.target.value)}
                autoComplete="off"
                defaultValue={searchParams.get("searchWine")?.toString()}
              />
              {isPendingWine && (
                <div className="text-sm absolute bottom-1/2 right-4 translate-y-1/2 text-[#93173c] mt-1">
                  <LoaderCircle className="size-5  animate-spin" />
                </div>
              )}
            </div>
            {wines.length > 0 && (
              <ul
                className={twMerge(
                  "border hidden shadow absolute right-0 left-0  z-20 shadow-zinc-300  mt-2 rounded max-h-52 overflow-y-auto flex-col  bg-white",
                  wines.length > 0 && "flex"
                )}
              >
                {wines.map((wine) => (
                  <li
                    onClick={() =>
                      handleSelectWine({
                        id: wine.id,
                        name: wine.name,
                        price: wine.price,
                        quantity: 1,
                      })
                    }
                    key={wine.id}
                    className="px-4 not-last:border-b hover:bg-accent cursor-pointer py-2"
                  >
                    {wine.name}
                  </li>
                ))}
              </ul>
            )}

            {wineList.length > 0 && (
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="text-sm">
                      <TableHead>Descrição</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {wineList.map((wine) => (
                      <TableRow className="text-sm" key={wine.id}>
                        <TableCell>
                          {wine.name}
                          <Input type="hidden" name="wineId" value={wine.id} />
                        </TableCell>
                        <TableCell>
                          {formatCurrencyInput(wine.price.toString())}
                        </TableCell>
                        <TableCell>
                          <input
                            type="hidden"
                            name="consignedId"
                            value={consigned?.id}
                          />
                          <Input
                            type="number"
                            defaultValue={wine.quantity}
                            className="max-w-16"
                            name="quantity"
                          />
                        </TableCell>
                        <TableCell>
                          <button
                            type="button"
                            onClick={() => handleDeleteWine(wine.id)}
                            className="text-destructive text-sm border border-destructive py-1.5 px-2 rounded-sm cursor-pointer"
                          >
                            Excluir
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <button className="bg-[#0d6efd] mt-4 w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none">
            Salvar
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
