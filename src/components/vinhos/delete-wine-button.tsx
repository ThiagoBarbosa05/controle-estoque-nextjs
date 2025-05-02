"use client";

import { deleteWine } from "@/app/actions/delete-wine";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export function DeleteWineButton({ wineId }: { wineId: string }) {
  const [isPending, startTransition] = useTransition();

  async function handleDeleteWine() {
    startTransition(async () => {
      await deleteWine(wineId);
    });
  }

  return (
    <button
      onClick={handleDeleteWine}
      disabled={isPending}
      className="text-sm cursor-pointer w-full disabled:opacity-45 flex text-destructive items-center gap-2"
    >
      <Trash className="size-3 text-destructive" /> Excluir
    </button>
  );
}
