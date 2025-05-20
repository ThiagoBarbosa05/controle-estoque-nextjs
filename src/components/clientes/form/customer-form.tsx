"use client";

import { createCustomer } from "@/app/actions/create-customer";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { updateCustomer } from "@/app/actions/update-customer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CustomerDetails } from "@/interfaces/get-customer-details-response";
import { formatCNPJ } from "@/lib/format-cnpj";
import { formatLandline } from "@/lib/format-landline";
import { formatPhone } from "@/lib/format-phone";
import { TriangleAlert } from "lucide-react";

import Link from "next/link";
import { useActionState, useState } from "react";

interface CustomerFormProps {
  customerToEdit?: CustomerDetails | null;
}

export function CustomerForm({ customerToEdit }: CustomerFormProps) {
  const [cnpj, setCnpj] = useState(customerToEdit?.document ?? "");
  const [cellphone, setCellphone] = useState(customerToEdit?.cellphone ?? "");
  const [businessPhone, setBusinessPhone] = useState(
    customerToEdit?.businessPhone ?? ""
  );

  const [formState, action, isPending] = useActionState(
    customerToEdit ? updateCustomer : createCustomer,
    EMPTY_FORM_STATE
  );

  return (
    <form action={action}>
      <h3 className="text-lg sm:text-2xl mb-5">Adicionar Novo Cliente</h3>

      {formState.status === "ERROR" && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Não foi possível criar novo cliente</AlertTitle>
          <AlertDescription>{formState.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1  my-6 gap-x-5 gap-y-4">
        <input type="hidden" name="customerId" value={customerToEdit?.id} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3">
          <div>
            <label className="block">Nome do Cliente*</label>
            <Input
              type="text"
              name="name"
              defaultValue={
                formState.payload?.get("name")?.toString() ??
                customerToEdit?.name ??
                ""
              }
            />
            {formState.fieldErrors.name && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.name}
              </span>
            )}
          </div>
          <div>
            <label className="block">Pessoa de Contato</label>
            <Input
              type="text"
              name="contactPerson"
              defaultValue={
                formState.payload?.get("contactPerson")?.toString() ??
                customerToEdit?.contactPerson ??
                ""
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3">
          <div>
            <label className="block">CNPJ*</label>

            <Input
              type="text"
              value={cnpj || ""}
              name="document"
              inputMode="numeric"
              placeholder="00.000.000/0000-00"
              defaultValue={
                formState.payload?.get("document")?.toString() ?? cnpj
              }
              onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
            />

            {formState.fieldErrors.document && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.document}
              </span>
            )}
          </div>
          <div>
            <label className="block">Inscrição Estadual*</label>
            <Input
              type="text"
              name="stateRegistration"
              defaultValue={
                formState.payload?.get("stateRegistration")?.toString() ??
                customerToEdit?.stateRegistration ??
                ""
              }
            />
            {formState.fieldErrors.stateRegistration && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.stateRegistration}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-3">
          <div>
            <label className="block">Email</label>
            <Input
              type="email"
              placeholder="exemplo@email.com"
              name="email"
              defaultValue={
                formState.payload?.get("email")?.toString() ??
                customerToEdit?.email ??
                ""
              }
            />
            {formState.fieldErrors.email && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.email}
              </span>
            )}
          </div>

          <div>
            <label className="block">Celular</label>

            <Input
              type="text"
              value={cellphone || ""}
              inputMode="numeric"
              onChange={(e) => setCellphone(formatPhone(e.target.value))}
              defaultValue={
                formState.payload?.get("cellphone")?.toString() ?? cellphone
              }
              placeholder="(00) 00000-0000"
              name="cellphone"
            />

            {formState.fieldErrors.cellphone && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.cellphone}
              </span>
            )}
          </div>

          <div>
            <label className="block">Telefone comercial</label>

            <Input
              value={businessPhone || ""}
              inputMode="numeric"
              onChange={(e) => setBusinessPhone(formatLandline(e.target.value))}
              placeholder="(00) 0000-0000"
              defaultValue={
                formState.payload?.get("businessPhone")?.toString() ??
                businessPhone
              }
              name="businessPhone"
            />

            {formState.fieldErrors.businessPhone && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.businessPhone}
              </span>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="my-6">
        <h3 className="text-lg sm:text-2xl">Endereço</h3>
        <div className="grid grid-cols-1 mt-5 gap-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4">
            <div>
              <label className="block">Endereço</label>
              <Input
                type="text"
                name="streetAddress"
                defaultValue={
                  formState.payload?.get("streetAddress")?.toString() ??
                  customerToEdit?.address.streetAddress ??
                  ""
                }
              />
            </div>

            <div>
              <label className="block">Número</label>
              <Input
                type="text"
                name="number"
                defaultValue={
                  formState.payload?.get("number")?.toString() ??
                  customerToEdit?.address.number ??
                  ""
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-4">
            <div>
              <label className="block">CEP</label>
              <Input
                type="text"
                name="zipCode"
                defaultValue={
                  formState.payload?.get("zipCode")?.toString() ??
                  customerToEdit?.address.zipCode ??
                  ""
                }
              />
              {formState.fieldErrors.address && (
                <span className="text-destructive pl-1 text-xs block mt-1">
                  {formState.fieldErrors.address}
                </span>
              )}
            </div>

            <div>
              <label className="block">Cidade</label>
              <Input
                type="text"
                name="city"
                defaultValue={
                  formState.payload?.get("city")?.toString() ??
                  customerToEdit?.address.city ??
                  ""
                }
              />
            </div>

            <div>
              <label className="block">Estado</label>
              <Input
                type="text"
                name="state"
                defaultValue={
                  formState.payload?.get("state")?.toString() ??
                  customerToEdit?.address.state ??
                  ""
                }
              />
            </div>
          </div>
          <div>
            <label className="block">Bairro</label>
            <Input
              type="text"
              name="neighborhood"
              defaultValue={
                formState.payload?.get("neighborhood")?.toString() ??
                customerToEdit?.address.neighborhood ??
                ""
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          disabled={isPending}
          className="bg-[#0d6efd] disabled:bg-[#0d6dfdad] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none"
        >
          Salvar
        </button>
        <Link
          href={`/clientes/${customerToEdit?.id ?? ""}`}
          className="border border-[#0d6efd] text-center text-[#0d6efd] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer rounded-sm leading-none"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
