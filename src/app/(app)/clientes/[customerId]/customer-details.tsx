import { getToken } from "@/app/auth/get-token";
import { GetCustomerDetailsResponse } from "@/interfaces/get-customer-details-response";
import { DeleteCustomer } from "@/app/(app)/clientes/delete-customer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function getCustomerDetails(
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

interface CustomerDetailsProps {
  customerId: string;
}

export async function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const { customer } = await getCustomerDetails(customerId);

  return (
    <>
      {!customer ? (
        <div className="">Cliente não encontrado!</div>
      ) : (
        <section>
          <div className="pb-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl mb-2 font-bold">
                  {customer.name}
                </h3>
                <p className="text-xs sm:text-sm mb-1 text-zinc-600">
                  <span className="text-[#7f1e2a] font-medium">CNPJ</span>:{" "}
                  {customer.document}
                </p>
                <p className="text-xs sm:text-sm text-zinc-600">
                  <span className="text-[#7f1e2a] font-medium">IE:</span>{" "}
                  {customer.stateRegistration}
                </p>
              </div>

              <div className="flex gap-3">
                <Button asChild>
                  <Link href={`/clientes/editar/${customerId}`}>Editar</Link>
                </Button>

                <DeleteCustomer customerId={customerId} />
              </div>
            </div>

            <div className="mt-4 max-w-[600px]">
              <h4 className="text-lg sm:text-xl font-medium">Contato</h4>

              <div className="space-y-1 sm:grid sm:grid-cols-2">
                {customer.contactPerson && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Pessoa de contato:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.contactPerson}{" "}
                    </span>
                  </p>
                )}

                {customer.email && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Email:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.email}{" "}
                    </span>
                  </p>
                )}
                {customer.cellphone && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Celular:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.cellphone}{" "}
                    </span>
                  </p>
                )}
                {customer.businessPhone && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Telefone comercial:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.businessPhone}{" "}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 max-w-[900px]">
              <h4 className="text-lg sm:text-xl font-medium">Localização</h4>
              <div className="space-y-1 sm:grid sm:grid-cols-3">
                {customer.address.streetAddress && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Endereço:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.address.streetAddress}{" "}
                    </span>
                  </p>
                )}
                {customer.address.number && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Número:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.address.number}{" "}
                    </span>
                  </p>
                )}

                {customer.address.neighborhood && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Bairro:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.address.neighborhood}{" "}
                    </span>
                  </p>
                )}
                {customer.address.zipCode && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    CEP:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.address.zipCode}{" "}
                    </span>
                  </p>
                )}
                {customer.address.city && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Cidade:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.address.city}{" "}
                    </span>
                  </p>
                )}
                {customer.address.state && (
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Estado:{" "}
                    <span className="text-[#7f1e2a] font-medium">
                      {customer.address.state}{" "}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
