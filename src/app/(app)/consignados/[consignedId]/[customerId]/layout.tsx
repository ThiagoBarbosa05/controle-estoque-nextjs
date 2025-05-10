import { ConsignedNavigation } from "@/components/consignados/navigation";
import { TokenPayload } from "@/interfaces/token-payload";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function ConsignedDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ consignedId: string; customerId: string }>;
}) {
  const { consignedId, customerId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const userRoles = jwtDecode(accessToken?.value ?? "") as TokenPayload;

  return (
    <section className="flex flex-1 flex-col w-full items-start">
      <h2 className="text-xl sm:text-4xl font-medium">
        Detalhes do Consignado
      </h2>
      <ConsignedNavigation
        allowedRoleList={userRoles.roles}
        consignedId={consignedId}
        customerId={customerId}
      />
      {children}
    </section>
  );
}
