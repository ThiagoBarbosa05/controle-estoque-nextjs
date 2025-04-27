import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCustomerStore } from "@/store/customer-store";
import Link from "next/link";

// async function listCustomers() {
//   const response = await fetch("http://localhost:4000/api/customers");

//   return response.json();
// }

export async function CustomerList() {
  // const { customer: customerList } = useCustomerStore();
  // const customers = await listCustomers();

  // console.log(customers);
  return (
    <TableBody>
      {/* {customerList.map((customer) => (
        <TableRow key={customer.id} className="py-10 text-zinc-800">
          <TableCell>{customer.customerName}</TableCell>
          <TableCell>{customer.contact}</TableCell>
          <TableCell>{customer.email}</TableCell>
          <TableCell>{customer.phone ?? customer.businessPhone}</TableCell>
          <TableCell>
            <Link
              className="border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white transition px-3 py-2 text-sm rounded-sm"
              href=""
            >
              Ver Estoque
            </Link>
          </TableCell>
        </TableRow>
      ))} */}
    </TableBody>
  );
}
