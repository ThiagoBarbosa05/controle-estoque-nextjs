"use client";

import { logout } from "@/app/actions/logout";
import { LogOut } from "lucide-react";

export function ButtonLogout() {
  return (
    <button
      onClick={() => logout()}
      className="flex cursor-pointer text-sm pl-3 text-[#93173c] mt-6 items-center gap-2"
    >
      Sair <LogOut className="size-4" />
    </button>
  );
}
