"use client";

import { countWine } from "@/app/actions/count-wines";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { Input } from "@/components/ui/input";
import { ConsignedDetails } from "@/interfaces/get-consigned-details-response";
import { useWineCountStore } from "@/store/wine-count-store";
import Link from "next/link";
import { useActionState } from "react";

interface WineCountProps {
  consigned: ConsignedDetails;
}

export function WineCountForm({ consigned }: WineCountProps) {
  const { quantities, setQuantity } = useWineCountStore();

  const [formSate, action, isPending] = useActionState(
    countWine,
    EMPTY_FORM_STATE
  );

  function handleChangeQuantity(id: string, value: number) {
    setQuantity(id, value);
  }

  return (
    <form action={action} className="w-full space-y-4 mt-6 h-full">
      {consigned.winesOnConsigned.map((wine) => (
        <div
          className="border space-y-2 p-4 shadow shadow-zinc-300 rounded-md"
          key={wine.consignedId + wine.wineId}
        >
          <p className="text-sm font-medium">{wine.wines.name}</p>
          <div className="flex items-center gap-5">
            <p className="text-sm text-zinc-700">
              Saldo: <span className="text-[#7e1e2a]">{wine.balance}</span>
            </p>
            <div className="flex items-center gap-2">
              <input type="hidden" name="wineId" value={wine.wineId} />
              <input type="hidden" name="consignedId" value={consigned.id} />
              <input
                type="hidden"
                name="customerId"
                value={consigned.customer.id}
              />
              <span className="text-zinc-600 text-sm">Qtd: </span>
              <Input
                type="number"
                className="max-w-16 text-center"
                defaultValue={wine.balance}
                name="quantity"
                onChange={(e) =>
                  handleChangeQuantity(wine.wineId, Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        <button
          disabled={isPending}
          className="bg-[#0d6efd] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none"
        >
          Salvar
        </button>
        <Link
          href={`/consignados/${consigned.id}/${consigned.customer.id}/inicio`}
          className="border border-[#0d6efd] block text-center w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition text-[#0d6efd]  rounded-sm leading-none"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
