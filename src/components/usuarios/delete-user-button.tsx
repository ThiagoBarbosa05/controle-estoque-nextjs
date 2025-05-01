"use client";

import { deleteUser } from "@/app/actions/delete-user";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export function DeleteUserButton({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();

  async function handleDeletaUser() {
    startTransition(async () => {
      await deleteUser(userId);
    });
  }

  return (
    <button
      onClick={handleDeletaUser}
      disabled={isPending}
      className="text-sm cursor-pointer w-full disabled:opacity-45 flex text-destructive items-center gap-2"
    >
      <Trash className="size-3 text-destructive" /> Excluir
    </button>
  );
}
