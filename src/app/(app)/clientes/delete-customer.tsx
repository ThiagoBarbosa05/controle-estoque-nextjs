"use client";

import { deleteCustomer } from "@/app/actions/delete-customer";

export function DeleteCustomer({ customerId }: { customerId: string }) {
  return (
    <button
      onClick={() => deleteCustomer(customerId)}
      className="border border-destructive text-center text-destructive w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer rounded-sm leading-none"
    >
      Deletar
    </button>
  );
}
