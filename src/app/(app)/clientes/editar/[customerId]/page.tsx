import { getToken } from "@/app/auth/get-token";
import { CustomerForm } from "@/components/clientes/form/customer-form";
import { GetCustomerDetailsResponse } from "@/interfaces/get-customer-details-response";

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

export default async function EditCustomerPage({ params }: { params: Params }) {
  const { customerId } = await params;
  const { customer } = await getCustomerDetails(customerId);

  return <CustomerForm customerToEdit={customer} />;
}
