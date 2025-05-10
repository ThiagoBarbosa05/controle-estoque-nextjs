"use client";

import {
  CircleDollarSign,
  Contact,
  LayoutDashboard,
  ScanBarcode,
  Users,
  Wine,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="size-[18px]" />,
    allowedRoles: ["administrador"],
  },
  {
    name: "Consignados",
    href: "/consignados",
    icon: <CircleDollarSign className="size-[18px]" />,
    allowedRoles: ["administrador", "vendedor", "cliente"],
  },
  {
    name: "Cadastro de Vinhos",
    href: "/vinhos",
    icon: <Wine className="size-[18px]" />,
    allowedRoles: ["administrador"],
  },
  {
    name: "Clientes",
    href: "/clientes",
    icon: <Contact className="size-[18px]" />,
    allowedRoles: ["administrador"],
  },
  {
    name: "Usuários",
    href: "/usuarios",
    icon: <Users className="size-[18px]" />,
    allowedRoles: ["administrador"],
  },
  {
    name: "Controle de Estoque",
    href: "/estoque",
    icon: <ScanBarcode className="size-[18px]" />,
    allowedRoles: ["administrador"],
  },
];

export function Navigation({
  allowedRolesList,
}: {
  allowedRolesList: string[];
}) {
  const pathname = usePathname();

  return (
    <nav className="pb-5">
      <ul className="flex flex-col gap-3">
        {navLinks
          .filter((link) =>
            link.allowedRoles.some((role) => allowedRolesList.includes(role))
          )
          .map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  className={twMerge(
                    "text-sm flex items-center gap-2 rounded-md hover:text-[#93173c] py-2 px-3 transition text-zinc-600",
                    isActive && "bg-[#93173c] text-zinc-100 hover:text-zinc-100"
                  )}
                  href={link.href}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
