"use client";

import { useWineStore } from "@/store/wine-store";
import { twMerge } from "tailwind-merge";

export function ToggleForm() {
  const { isOpenForm, openForm, closeForm } = useWineStore();

  return (
    <button
      onClick={() => (isOpenForm ? closeForm() : openForm())}
      className={twMerge(
        "bg-[#188754] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#03a679] text-white rounded-sm leading-none",
        isOpenForm &&
          "bg-transparent border border-[#188754] text-[#188754] hover:bg-transparent"
      )}
    >
      {isOpenForm ? "Cancelar" : "Novo Vinho"}
    </button>
  );
}
