"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function ConsignedNavigation({ consignedId }: { consignedId: string }) {
  const pathname = usePathname();

  console.log(consignedId);

  const navLinks = [
    {
      name: "Início",
      href: `/consignados/${consignedId}/inicio`,
    },
    {
      name: "Contagem",
      href: `/consignados/${consignedId}/contagem`,
    },
    {
      name: "Histórico",
      href: `/consignados/${consignedId}/historico`,
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
