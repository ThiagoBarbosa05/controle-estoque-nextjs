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
import { SheetClose } from "../ui/sheet";

export function NavigationMobile() {
  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="size-[18px]" />,
    },
    {
      name: "Consignados",
      href: "/consignados",
      icon: <CircleDollarSign className="size-[18px]" />,
    },
    {
      name: "Cadastro de Vinhos",
      href: "/vinhos",
      icon: <Wine className="size-[18px]" />,
    },
    {
      name: "Clientes",
      href: "/clientes",
      icon: <Contact className="size-[18px]" />,
    },
    {
      name: "Usuários",
      href: "/usuarios",
      icon: <Users className="size-[18px]" />,
    },
    {
      name: "Controle de Estoque",
      href: "/estoque",
      icon: <ScanBarcode className="size-[18px]" />,
    },
  ];

  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-3">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href);

          return (
            <li className="" key={link.href}>
              <SheetClose asChild>
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
              </SheetClose>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
