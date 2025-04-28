import { getToken } from "@/app/auth/get-token";
import { UserForm } from "@/components/usuarios/form/user-form";

async function listRoles(): Promise<{ roles: { id: string; name: string }[] }> {
  const accessToken = await getToken();

  const response = await fetch("http://localhost:4000/api/users/roles", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

export default async function CreateUser() {
  const result = await listRoles();

  return <UserForm roles={result.roles} />;
}
