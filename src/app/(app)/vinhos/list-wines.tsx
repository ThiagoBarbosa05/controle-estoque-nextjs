import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListWinesResponse, Wine } from "@/interfaces/list-wines-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { EllipsisVertical, Pen } from "lucide-react";
import Link from "next/link";
import { DeleteWineButton } from "./delete-wine-button";
import { getToken } from "@/app/auth/get-token";

async function listWines(searchTerm?: string): Promise<ListWinesResponse> {
  const accessToken = await getToken();

  const res = await fetch(
    searchTerm
      ? `${process.env.API_BASE_URL}/wines?search=${searchTerm}`
      : `${process.env.API_BASE_URL}/wines`,
    {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    console.log(res.status);
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface ListWinesProps {
  searchTerm?: string;
}

export async function ListWines({ searchTerm }: ListWinesProps) {
  const result = await listWines(searchTerm);

  return (
    <section className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-sm">Nome</TableHead>
            <TableHead className="font-bold text-sm">Tipo</TableHead>
            <TableHead className="font-bold text-sm">Safra</TableHead>
            <TableHead className="font-bold text-sm">Produtor</TableHead>
            <TableHead className="font-bold text-sm">País</TableHead>
            <TableHead className="font-bold text-sm">Preço</TableHead>
            <TableHead className="font-bold text-sm">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.wines.map((wine) => (
            <TableRow key={wine.id} className="py-10 text-sm text-zinc-800">
              <TableCell>{wine.name}</TableCell>
              <TableCell>{wine.type}</TableCell>
              <TableCell>{wine.harvest}</TableCell>
              <TableCell>{wine.producer}</TableCell>
              <TableCell>{wine.country}</TableCell>
              <TableCell>
                {wine.price && formatCurrencyInput(wine.price.toString())}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border  p-1 rounded-full cursor-pointer hover:bg-accent">
                    <EllipsisVertical className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link
                        href={`/vinhos/editar/${wine.id}`}
                        className="text-sm w-full flex items-center gap-2"
                      >
                        <Pen className="size-3" /> Editar
                      </Link>
                    </DropdownMenuItem>
                    <Separator className="my-1" />
                    <DropdownMenuItem>
                      <DeleteWineButton wineId={wine.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
