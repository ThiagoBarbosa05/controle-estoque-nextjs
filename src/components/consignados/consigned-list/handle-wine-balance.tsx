"use client";

import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { updateWineBalance } from "@/app/actions/update-wine-balance";
import { Input } from "@/components/ui/input";
import { Check, Loader, LoaderCircle, X } from "lucide-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function HandleWineBalance({
  consignedId,
  wineId,
  wineBalance,
  customerId,
}: {
  consignedId: string;
  wineId: string;
  wineBalance: number;
  customerId: string;
}) {
  const [showInputToEdit, setShowInputToEdit] = useState(false);

  const [formState, action, isPending] = useActionState(
    updateWineBalance,
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (formState.status === "ERROR") {
      toast.error(formState.message);
    }

    if (!isPending) {
      setShowInputToEdit(false);
    }
  }, [formState]);

  return (
    <form className="max-w-16 flex gap-2" action={action}>
      <Input
        className="min-w-16 w-16 text-center cursor-pointer"
        onClick={() => setShowInputToEdit(true)}
        name="balance"
        type={showInputToEdit ? "number" : "button"}
        defaultValue={wineBalance}
        min={0}
      />

      <input type="hidden" name="consignedId" id="" value={consignedId} />
      <input type="hidden" name="wineId" id="" value={wineId} />
      <input type="hidden" name="customerId" id="" value={customerId} />

      {showInputToEdit && (
        <div className="flex gap-2">
          <button
            className="rounded-md border border-[#0c6efd] text-[#0c6efd] px-2 cursor-pointer"
            title="salvar"
          >
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
          </button>
          <button
            type="button"
            className="rounded-md border border-destructive text-destructive px-2 cursor-pointer"
            title="cancelar"
            onClick={() => {
              setShowInputToEdit(false);
            }}
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </form>
  );
}
