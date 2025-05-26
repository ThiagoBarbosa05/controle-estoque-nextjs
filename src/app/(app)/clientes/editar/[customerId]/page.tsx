import { getToken } from "@/app/auth/get-token";
import { GetCustomerDetailsResponse } from "@/interfaces/get-customer-details-response";
import { CustomerForm } from "../../customer-form";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

type Params = Promise<{ customerId: string }>;

async function getCustomerDetails(
  customerId: string
): Promise<GetCustomerDetailsResponse> {
  const accessToken = await getToken();

  const response = await fetch(
    `${process.env.API_BASE_URL}/customers/${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    return { customer: null };
  }

  return response.json();
}

export const metadata: Metadata = {
  title: "Editar cliente",
  description: "Editar informações de um cliente",
};

export default async function EditCustomerPage({ params }: { params: Params }) {
  const { customerId } = await params;
  const { customer } = await getCustomerDetails(customerId);

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">Editar cliente</h2>
      <Separator />
      <CustomerForm customerToEdit={customer} />
    </section>
  );
}
