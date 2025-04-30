import { getToken } from "@/app/auth/get-token";
import { EditUserForm } from "@/components/usuarios/form/edit-user-form";
import { GetUserResponse } from "@/interfaces/get-user-response";
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

async function userToEdit(userId: string): Promise<GetUserResponse | null> {
  const accessToken = await getToken();

  const response = await fetch(`${process.env.API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function EditUserPage(props: {
  params: Promise<{ userId: string }>;
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const result = await listRoles();

  const { userId } = await props.params;
  const userResponse = await userToEdit(userId);

  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search;

  const customers = await listCustomers(searchTerm);

  return (
    <EditUserForm
      user={userResponse?.user}
      roles={result.roles}
      customers={customers}
    />
  );
}
