import { getToken } from "@/app/auth/get-token";
import { DeleteCustomer } from "@/components/clientes/delete-customer";
import { Separator } from "@/components/ui/separator";
import { GetCustomerDetailsResponse } from "@/interfaces/get-customer-details-response";
import Link from "next/link";

type Params = Promise<{ customerId: string }>;

async function getCustomerDetails(
  customerId: string
): Promise<GetCustomerDetailsResponse> {
  const accessToken = await getToken();

  const response = await fetch(
    `http://localhost:4000/api/customers/${customerId}`,
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

export default async function CustomerDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { customerId } = await params;
  const { customer } = await getCustomerDetails(customerId);

  return (
    <>
      {!customer ? (
        <div className="">Cliente nao encontrado! {customerId}</div>
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
                <Link
                  href={`/clientes/editar/${customerId}`}
                  className="border bg-[#0d6efd] text-center hover:bg-[#0d31fd] text-white w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer rounded-sm leading-none"
                >
                  Editar
                </Link>
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

          <Separator />

          <div className="mt-6">
            <h4>Histórico</h4>
            <p>em breve</p>
          </div>
        </section>
      )}
    </>
  );
}
