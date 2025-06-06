import { getToken } from "@/app/auth/get-token";
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
import { DeleteUserButton } from "@/app/(app)/usuarios/delete-user-button";
import { ListUsersResponse } from "@/interfaces/list-users-response";
import { format } from "date-fns";
import { EllipsisVertical, Pen } from "lucide-react";
import Link from "next/link";

async function listUsers(searchTerm?: string): Promise<ListUsersResponse> {
  const accessToken = await getToken();

  const url = searchTerm
    ? `${process.env.API_BASE_URL}/users?search=${searchTerm}`
    : `${process.env.API_BASE_URL}/users`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
  });

  return response.json();
}

interface ListUsersProps {
  searchTerm?: string;
}

export async function ListUsers({ searchTerm }: ListUsersProps) {
  const usersList = await listUsers(searchTerm);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-sm">Nome</TableHead>
          <TableHead className="font-bold text-sm">Email</TableHead>
          <TableHead className="font-bold text-sm">Cargo</TableHead>
          <TableHead className="font-bold text-sm">Cliente</TableHead>
          <TableHead className="font-bold text-sm">Data de Criação</TableHead>
          <TableHead className="font-bold text-sm">Ações</TableHead>
        </TableRow>
      </TableHeader>
      {usersList && (
        <TableBody>
          {usersList.users.map((user) => (
            <TableRow key={user.id} className="py-10 text-sm text-zinc-800">
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.roles[0].name}</TableCell>
              <TableCell>{user.customer ? user.customer.name : ""}</TableCell>
              <TableCell>{format(user.createdAt, "dd/MM/yyyy")}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border  p-1 rounded-full cursor-pointer hover:bg-accent">
                    <EllipsisVertical className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link
                        href={`/usuarios/editar/${user.id}`}
                        className="text-sm w-full flex items-center gap-2"
                      >
                        <Pen className="size-3" /> Editar
                      </Link>
                    </DropdownMenuItem>
                    <Separator className="my-1" />
                    <DropdownMenuItem>
                      <DeleteUserButton userId={user.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
