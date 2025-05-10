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
    <nav className="w-full mt-5">
      <ul className="flex items-center w-full border-b gap-5">
        {navLinks
          .filter((link) =>
            link.allowedRoles.some((role) => allowedRoleList.includes(role))
          )
          .map((link) => {
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
