"use client";

import { useWineStore } from "@/store/wine-store";

export function CardWine() {
  const { wine } = useWineStore();

  return (
    <div className="p-4 text-white rounded-lg bg-[#188754]">
      <p className="text-lg sm:text-xl mb-2 min-h-12">Total de Vinhos</p>

      <span className="text-4xl sm:text-6xl font-light">{wine.length}</span>
    </div>
  );
}
