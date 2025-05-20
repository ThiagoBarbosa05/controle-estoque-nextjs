import { getToken } from "@/app/auth/get-token";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
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
    // cache: "force-cache",
  });

  return response.json();
}

export async function CustomerList({ searchTerm }: { searchTerm?: string }) {
  const { customers } = await listCustomers(searchTerm);

  return (
    <>
      {!customers ||
        (customers.length === 0 ? (
          <h3>Nenhum cliente encontrado.</h3>
        ) : (
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
                    className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
                    href={`/clientes/${customer.id}`}
                  >
                    Ver Detalhes
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ))}
    </>
  );
}
