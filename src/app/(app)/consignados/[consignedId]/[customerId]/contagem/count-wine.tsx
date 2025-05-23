"use client";

import { countWine } from "@/app/actions/count-wines";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConsignedDetails } from "@/interfaces/get-consigned-details-response";
import { useWineCountStore } from "@/store/wine-count-store";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

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

  useEffect(() => {
    if (formSate.status === "ERROR") {
      toast.error(formSate.message);
    }
  }, [formSate]);

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
                min={0}
                onChange={(e) =>
                  handleChangeQuantity(wine.wineId, Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        <Button disabled={isPending}>Salvar</Button>

        <Button variant="outline" asChild>
          <Link
            href={`/consignados/${consigned.id}/${consigned.customer.id}/inicio`}
          >
            Cancelar
          </Link>
        </Button>
      </div>
    </form>
  );
}
