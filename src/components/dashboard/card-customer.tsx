"use client";

import { useCustomerStore } from "@/store/customer-store";

export function CardCustomer() {
  const { customer: customerList } = useCustomerStore();

  return (
    <div className="p-4 text-white rounded-lg bg-[#0d6efd]">
      <p className="text-lg sm:text-xl mb-2 min-h-12">Total de Clientes</p>

      <span className="text-4xl sm:text-6xl font-light">
        {customerList.length}
      </span>
    </div>
  );
}
