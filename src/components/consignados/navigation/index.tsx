"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function ConsignedNavigation({
  consignedId,
  customerId,
}: {
  consignedId: string;
  customerId: string;
}) {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Início",
      href: `/consignados/${consignedId}/${customerId}/inicio`,
    },
    {
      name: "Contagem",
      href: `/consignados/${consignedId}/${customerId}/contagem`,
    },
    {
      name: "Histórico",
      href: `/consignados/${consignedId}/${customerId}/historico`,
    },
  ];

  return (
    <nav className="w-full mt-5">
      <ul className="flex items-center w-full border-b gap-5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li
              className={twMerge(
                "border-b-2 border-transparent",
                isActive && "border-b-2 border-[#7e1e2a] py-2 "
              )}
              key={link.href}
            >
              <Link
                className={twMerge(
                  "text-sm border-b-2 hover:text-[#7e1e2a] border-transparent font-medium py-2 px-3 cursor-pointer",
                  isActive && " text-[#7e1e2a]"
                )}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
