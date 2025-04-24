"use client";

import { useCustomerStore } from "@/store/customer-store";
import { twMerge } from "tailwind-merge";

export function ToggleForm() {
  const { isOpenForm, openForm, closeForm } = useCustomerStore();

  return (
    <button
      onClick={() => (isOpenForm ? closeForm() : openForm())}
      className={twMerge(
        "bg-[#0d6efd] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none",
        isOpenForm &&
          "border border-[#0d6efd] text-[#0d6efd] hover:bg-transparent bg-transparent"
      )}
    >
      {isOpenForm ? "Cancelar" : "Novo Cliente"}
    </button>
  );
}
