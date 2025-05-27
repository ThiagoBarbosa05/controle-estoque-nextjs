"use client";

import { deleteCustomer } from "@/app/actions/delete-customer";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export function DeleteCustomer({ customerId }: { customerId: string }) {
  return (
    <button
      onClick={() => deleteCustomer(customerId)}
      title="Deletar cliente"
      className="border border-destructive text-center text-destructive w-full sm:w-[initial] h-9 px-4 py-2 flex items-center justify-center text-sm cursor-pointer rounded-sm leading-none"
    >
      <span className="hidden sm:block">Deletar</span>
      <span className="block sm:hidden">
        <Trash className="size-5 text-destructive" />
      </span>
    </button>
  );
}
