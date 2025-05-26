import { getToken } from "@/app/auth/get-token";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListCustomerResponse } from "@/interfaces/list-customer-response";
import Link from "next/link";

async function listCustomers(
  searchTerm?: string
): Promise<ListCustomerResponse> {
  const accessToken = await getToken();

  const url = searchTerm
    ? `${process.env.API_BASE_URL}/customers?search=${searchTerm}`
    : `${process.env.API_BASE_URL}/customers`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
  });

  return response.json();
}

export async function CustomerList({ searchTerm }: { searchTerm?: string }) {
  const { customers } = await listCustomers(searchTerm);

  return (
    <section className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-sm">Nome</TableHead>
            <TableHead className="font-bold text-sm">Contato</TableHead>
            <TableHead className="font-bold text-sm">Email</TableHead>
            <TableHead className="font-bold text-sm">Telefone</TableHead>
            <TableHead className="font-bold text-sm">Ações</TableHead>
          </TableRow>
        </TableHeader>
        {customers && (
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                className="py-10 text-sm text-zinc-800"
              >
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.contactPerson}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  {customer.cellphone ?? customer.businessPhone}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/clientes/${customer.id}`}
                    className="text-[#93173c]  underline underline-offset-2 transition text-sm rounded-sm"
                  >
                    Ver Detalhes
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </section>
  );
}
