"use client";

import { logout } from "@/app/actions/logout";
import { LogOut } from "lucide-react";

export function ButtonLogout() {
  return (
    <button
      onClick={() => logout()}
      className="flex cursor-pointer pl-3 text-[#93173c] mt-6 items-center gap-3"
    >
      Sair <LogOut className="size-5" />
    </button>
  );
}
