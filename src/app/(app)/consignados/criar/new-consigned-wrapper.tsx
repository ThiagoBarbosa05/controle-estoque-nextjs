import { ListCustomerResponse } from "@/interfaces/list-customer-response";
import { CreateNewConsignedForm } from "./create-new-consigned-form";
import { getToken } from "@/app/auth/get-token";
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

interface NewConsignedWrapperProps {
  searchCustomerTerm: string | undefined;
  searchWineTerm: string | undefined;
}

export async function NewConsignedWrapper({
  searchCustomerTerm,
  searchWineTerm,
}: NewConsignedWrapperProps) {
  const customerResult = await listCustomers(searchCustomerTerm);
  const wineResult = await listWines(searchWineTerm);
  return (
    <CreateNewConsignedForm
      customers={customerResult.customers}
      wines={wineResult.wines}
    />
  );
}
