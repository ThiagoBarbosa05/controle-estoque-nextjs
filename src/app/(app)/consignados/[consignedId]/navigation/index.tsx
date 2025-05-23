"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function ConsignedNavigation({
  consignedId,
  customerId,
  allowedRoleList,
}: {
  consignedId: string;
  customerId: string;
  allowedRoleList: string[];
}) {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Início",
      href: `/consignados/${consignedId}/${customerId}/inicio`,
      allowedRoles: ["administrador", "vendedor", "cliente"],
    },
    {
      name: "Contagem",
      href: `/consignados/${consignedId}/${customerId}/contagem`,
      allowedRoles: ["administrador", "vendedor"],
    },
    {
      name: "Histórico",
      href: `/consignados/${consignedId}/${customerId}/historico`,
      allowedRoles: ["administrador", "vendedor", "cliente"],
    },
  ];

  return (
    <nav className="bg-white rounded-sm shadow-sm mt-5">
      <ul className="flex items-center w-full">
        {navLinks
          .filter((link) =>
            link.allowedRoles.some((role) => allowedRoleList.includes(role))
          )
          .map((link) => {
            const isActive = pathname === link.href;

            return (
              <li className="p-1.5" key={link.href}>
                <Link
                  className={twMerge(
                    "text-sm text-zinc-500 hover:text-[#7e1e2a] rounded-sm border-transparent font-medium py-1.5 block px-3 cursor-pointer",
                    isActive && "bg-[#93173c] text-white hover:text-white"
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
