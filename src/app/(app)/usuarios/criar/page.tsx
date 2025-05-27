import { getToken } from "@/app/auth/get-token";
import { UserForm } from "@/app/(app)/usuarios/criar/user-form";
import { ListCustomerResponse } from "@/interfaces/list-customer-response";

async function listRoles(): Promise<{ roles: { id: string; name: string }[] }> {
  const accessToken = await getToken();

  const response = await fetch(`${process.env.API_BASE_URL}/users/roles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
  });

  return response.json();
}

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

export default async function CreateUser(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const result = await listRoles();

  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  const customers = await listCustomers(searchTerm);

  return (
    <section>
      <UserForm roles={result.roles} customers={customers} />
    </section>
  );
}
