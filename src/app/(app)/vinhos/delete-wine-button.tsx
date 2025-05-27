"use client";

import { deleteWine } from "@/app/actions/delete-wine";
import { Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function DeleteWineButton({ wineId }: { wineId: string }) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDeleteWine() {
    startTransition(async () => {
      const response = await deleteWine(wineId);
      toast.error("Erro ao excluir vinho", {
        description: response.message,
        action: {
          label: "fechar",
          onClick: () => toast.dismiss(),
        },
      });
    });
  }

  // useEffect(() => {
  //   toast.error("Erro ao excluir vinho", {
  //     description: errorMessage,
  //   });
  // }, []);

  return (
    <button
      onClick={handleDeleteWine}
      type="button"
      disabled={isPending}
      className="text-sm cursor-pointer w-full disabled:opacity-45 flex text-destructive items-center gap-2"
    >
      <Trash className="size-3 text-destructive" /> Excluir
    </button>
  );
}
