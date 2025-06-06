"use client";

import { createCustomer } from "@/app/actions/create-customer";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { updateCustomer } from "@/app/actions/update-customer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
            <label htmlFor="name" className="block">
              Nome do Cliente*
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Insira o nome do cliente"
              className="bg-white"
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
            <label htmlFor="contactPerson" className="block">
              Pessoa de Contato
            </label>
            <Input
              type="text"
              className="bg-white"
              id="contactPerson"
              placeholder="Insira o nome da pessoa de contato"
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
            <label htmlFor="document" className="block">
              CNPJ*
            </label>

            <Input
              type="text"
              value={cnpj || ""}
              id="document"
              name="document"
              inputMode="numeric"
              className="bg-white"
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
            <label htmlFor="stateRegistration" className="block">
              Inscrição Estadual*
            </label>
            <Input
              type="text"
              name="stateRegistration"
              id="stateRegistration"
              className="bg-white"
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
            <label htmlFor="email" className="block">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="exemplo@email.com"
              name="email"
              className="bg-white"
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
            <label htmlFor="cellphone" className="block">
              Celular
            </label>

            <Input
              type="text"
              value={cellphone || ""}
              id="cellphone"
              inputMode="numeric"
              className="bg-white"
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
            <label htmlFor="businessPhone" className="block">
              Telefone comercial
            </label>

            <Input
              value={businessPhone || ""}
              inputMode="numeric"
              className="bg-white"
              id="businessPhone"
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
              <label htmlFor="streetAddress" className="block">
                Endereço
              </label>
              <Input
                type="text"
                name="streetAddress"
                id="streetAddress"
                placeholder="Rua, Avenida, etc."
                className="bg-white"
                defaultValue={
                  formState.payload?.get("streetAddress")?.toString() ??
                  customerToEdit?.address.streetAddress ??
                  ""
                }
              />
            </div>

            <div>
              <label htmlFor="number" className="block">
                Número
              </label>
              <Input
                type="text"
                name="number"
                id="number"
                placeholder="Número do endereço"
                className="bg-white"
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
              <label htmlFor="zipCode" className="block">
                CEP
              </label>
              <Input
                type="text"
                name="zipCode"
                className="bg-white"
                id="zipCode"
                placeholder="00000-000"
                inputMode="numeric"
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
              <label htmlFor="city" className="block">
                Cidade
              </label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Insira a cidade"
                className="bg-white"
                defaultValue={
                  formState.payload?.get("city")?.toString() ??
                  customerToEdit?.address.city ??
                  ""
                }
              />
            </div>

            <div>
              <label htmlFor="state" className="block">
                Estado
              </label>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="Insira o estado"
                className="bg-white"
                defaultValue={
                  formState.payload?.get("state")?.toString() ??
                  customerToEdit?.address.state ??
                  ""
                }
              />
            </div>
          </div>
          <div>
            <label htmlFor="neighborhood" className="block">
              Bairro
            </label>
            <Input
              type="text"
              name="neighborhood"
              id="neighborhood"
              placeholder="Insira o bairro"
              className="bg-white"
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
        <Button type="submit" disabled={isPending}>
          Salvar
        </Button>
        <Button asChild variant={"outline"}>
          <Link href={`/clientes/${customerToEdit?.id ?? ""}`}>Cancelar</Link>
        </Button>
      </div>
    </form>
  );
}
