"use client";
import { useCustomerStore } from "@/store/customer-store";
import { useWineStore } from "@/store/wine-store";
import { LoaderCircle, X } from "lucide-react";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Select from "react-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConsignedStore } from "@/store/consigned-store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Customer } from "@/interfaces/list-customer-response";
import { Input } from "@/components/ui/input";
import { Wine } from "@/interfaces/list-wines-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import Link from "next/link";
import { createConsigned } from "@/app/actions/create-consigned";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";

export function CreateNewConsignedForm({
  customers,
  wines,
}: {
  customers: Customer[];
  wines: Wine[];
}) {
  const {
    customer: customerStore,
    deleteCustomer,
    createCustomer,
    reset: resetCustomer,
  } = useCustomerStore();

  const {
    wine: wineStored,
    createWine,
    deleteWine,
    reset: resetWines,
  } = useWineStore();

  const [formState, action, isPending] = useActionState(
    createConsigned,
    EMPTY_FORM_STATE
  );

  const [isPendingCustomer, startTransitionCustomer] = useTransition();
  const [isPendingWine, startTransitionWine] = useTransition();
  const [isPendingAction, startTransitionAction] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const handleSearchCustomer = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("searchCustomer", term);
    } else {
      params.delete("searchCustomer");
    }

    startTransitionCustomer(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const handleSearchWine = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("searchWine", term);
    } else {
      params.delete("searchWine");
    }

    startTransitionWine(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  function handleSelectCustomer(customer: { id: string; name: string }) {
    createCustomer(customer);
    replace(`${pathname}`);
  }

  function handleSelectWine(wine: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }) {
    createWine(wine);
    replace(`${pathname}`);
  }

  async function handleSubmit(formData: FormData) {
    const result = await createConsigned(EMPTY_FORM_STATE, formData);

    if (result?.status === "SUCCESS") {
      deleteCustomer();
      resetWines();
      push("/consignados"); // redireciona no cliente
    }

    // Aqui você pode tratar erros se houver
  }

  return (
    <form
      action={(formData) => startTransitionAction(() => handleSubmit(formData))}
      className={"mt-6 border p-4 rounded-md"}
    >
      <h3 className="text-xl sm:text-2xl">Adicionar Novo Consignado</h3>

      <div className="grid grid-cols-1 sm:grid-cols-1 mt-6 gap-5">
        <div className="w-full  relative">
          <label htmlFor="customer" className="block">
            Cliente*
          </label>

          {customerStore.name ? (
            <div className="flex gap-2">
              <Input
                className="disabled:opacity-100 disabled:text-[#93173c]"
                disabled
                value={customerStore.name}
              />
              {/* Campo oculto com o ID */}
              <input
                type="hidden"
                name="customerId"
                value={customerStore.id ?? ""}
              />
              <button
                type="button"
                onClick={() => {
                  deleteCustomer();
                }}
                className="text-destructive text-sm border border-destructive px-2 rounded-sm cursor-pointer"
              >
                cancelar
              </button>
            </div>
          ) : (
            <div className="relative">
              <Input
                id="customer"
                type="text"
                onChange={(e) => handleSearchCustomer(e.target.value)}
                autoComplete="off"
                defaultValue={searchParams.get("searchCustomer")?.toString()}
              />
              {isPendingCustomer && (
                <div className="text-sm absolute bottom-1/2 right-4 translate-y-1/2 text-[#93173c] mt-1">
                  <LoaderCircle className="size-5  animate-spin" />
                </div>
              )}
            </div>
          )}

          {customers.length > 0 && (
            <ul
              className={twMerge(
                "border hidden shadow shadow-zinc-300 absolute mt-2 rounded max-h-52 overflow-y-auto right-0 left-0  flex-col z-10 bg-white",
                customers.length > 0 && "flex"
              )}
            >
              {customers.map((customer) => (
                <li
                  onClick={() =>
                    handleSelectCustomer({
                      id: customer.id,
                      name: customer.name,
                    })
                  }
                  key={customer.id}
                  className="px-4 not-last:border-b hover:bg-accent cursor-pointer py-2"
                >
                  {customer.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <label htmlFor="wine">Vinhos*</label>

          <div className="relative">
            <Input
              id="wine"
              type="text"
              onChange={(e) => handleSearchWine(e.target.value)}
              autoComplete="off"
              defaultValue={searchParams.get("searchWine")?.toString()}
            />
            {isPendingWine && (
              <div className="text-sm absolute bottom-1/2 right-4 translate-y-1/2 text-[#93173c] mt-1">
                <LoaderCircle className="size-5  animate-spin" />
              </div>
            )}
          </div>
          {wines.length > 0 && (
            <ul
              className={twMerge(
                "border hidden shadow shadow-zinc-300 absolute mt-2 rounded max-h-52 overflow-y-auto right-0 left-0  flex-col z-10 bg-white",
                wines.length > 0 && "flex"
              )}
            >
              {wines.map((wine) => (
                <li
                  onClick={() =>
                    handleSelectWine({
                      id: wine.id,
                      name: wine.name,
                      price: wine.price,
                      quantity: 1,
                    })
                  }
                  key={wine.id}
                  className="px-4 not-last:border-b hover:bg-accent cursor-pointer py-2"
                >
                  {wine.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {wineStored.length > 0 && (
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow className="text-sm">
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {wineStored.map((wine) => (
                <TableRow className="text-sm" key={wine.id}>
                  <TableCell>
                    {wine.name}{" "}
                    <Input type="hidden" name="wineId" value={wine.id} />
                  </TableCell>
                  <TableCell>
                    {formatCurrencyInput(wine.price.toString())}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      defaultValue={wine.quantity}
                      className="max-w-16"
                      name="quantity"
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => deleteWine(wine.id)}
                      className="text-destructive text-sm border border-destructive py-1.5 px-2 rounded-sm cursor-pointer"
                    >
                      Excluir
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex gap-2">
        <button
          disabled={isPendingAction}
          className="bg-[#0d6efd] mt-4 w-full disabled:bg-[#5a82cc] sm:w-[initial]  py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none"
        >
          Salvar
        </button>
        <Link
          href="/consignados"
          type="button"
          className="border border-[#0d6efd] mt-4 w-full sm:w-[initial]  py-3 px-4 text-sm cursor-pointer transition text-[#0d6efd] rounded-sm leading-none"
        >
          Voltar
        </Link>
      </div>
    </form>
  );
}
