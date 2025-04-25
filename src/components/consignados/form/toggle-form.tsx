"use client";

import { useConsignedStore } from "@/store/consigned-store";
import { twMerge } from "tailwind-merge";

export function ToggleForm() {
  const { isOpenForm, openForm, closeForm } = useConsignedStore();

  return (
    <button
      onClick={() => (isOpenForm ? closeForm() : openForm())}
      className={twMerge(
        "bg-[#0d6efd] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none",
        isOpenForm &&
          "bg-transparent border border-[#0d6efd] text-[#0d6efd] hover:bg-transparent"
      )}
    >
      {isOpenForm ? "Cancelar" : "Novo Consignado"}
    </button>
  );
}
