import { getToken } from "@/app/auth/get-token";
import { CreateNewConsignedForm } from "@/components/consignados/form";
import { ListCustomerResponse } from "@/interfaces/list-customer-response";
import { ListWinesResponse } from "@/interfaces/list-wines-response";

async function listCustomers(
  searchTerm?: string
): Promise<ListCustomerResponse> {
  const accessToken = await getToken();

  const url = `${process.env.API_BASE_URL}/customers?search=${searchTerm}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
  });

  return response.json();
}

async function listWines(searchTerm?: string): Promise<ListWinesResponse> {
  const accessToken = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/wines?search=${searchTerm}`,
    {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error ao recuperar dados no servidor");
  }

  return res.json();
}

export default async function CreateConsignedPage(props: {
  searchParams?: Promise<{
    searchCustomer?: string;
    searchWine?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchCustomerTerm = searchParams?.searchCustomer;
  const searchWineTerm = searchParams?.searchWine;

  const customerResult = await listCustomers(searchCustomerTerm);
  const wineResult = await listWines(searchWineTerm);

  return (
    <CreateNewConsignedForm
      customers={customerResult.customers}
      wines={wineResult.wines}
    />
  );
}
