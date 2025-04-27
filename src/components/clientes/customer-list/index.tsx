import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ListCustomerResponse } from "@/interfaces/list-customer-response";
import Link from "next/link";

async function listCustomers(): Promise<ListCustomerResponse> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch("http://localhost:4000/api/customers", {
    // cache: "force-cache",
  });

  return response.json();
}

export async function CustomerList() {
  const { customers } = await listCustomers();

  console.log(customers);
  return (
    <TableBody>
      {customers.map((customer) => (
        <TableRow key={customer.id} className="py-10 text-sm text-zinc-800">
          <TableCell>{customer.name}</TableCell>
          <TableCell>{customer.contactPerson}</TableCell>
          <TableCell>{customer.email}</TableCell>
          <TableCell>{customer.cellphone ?? customer.businessPhone}</TableCell>
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
  );
}
