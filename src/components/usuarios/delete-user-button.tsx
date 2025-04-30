"use client";

import { deleteUser } from "@/app/actions/delete-user";
import { Trash } from "lucide-react";

export function DeleteUserButton({ userId }: { userId: string }) {
  return (
    <button
      onClick={async () => await deleteUser(userId)}
      className="text-sm cursor-pointer w-full flex text-destructive items-center gap-2"
    >
      <Trash className="size-3 text-destructive" /> Excluir
    </button>
  );
}
