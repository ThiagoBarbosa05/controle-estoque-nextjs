"use client";
import { useCustomerStore } from "@/store/customer-store";
import { useWineStore } from "@/store/wine-store";
import { LoaderCircle, TriangleAlert, X } from "lucide-react";
import { useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Customer } from "@/interfaces/list-customer-response";
import { Input } from "@/components/ui/input";
import { Wine } from "@/interfaces/list-wines-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { createConsigned } from "@/app/actions/create-consigned";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
  } = useCustomerStore();

  const {
    wine: wineStored,
    createWine,
    deleteWine,
    reset: resetWines,
  } = useWineStore();

  const [isPendingCustomer, startTransitionCustomer] = useTransition();
  const [isPendingWine, startTransitionWine] = useTransition();
  const [isPendingAction, startTransitionAction] = useTransition();

  const [formError, setFormError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push, refresh } = useRouter();

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
    const existingWine = wineStored.find((w) => w.id === wine.id);

    if (existingWine) {
      toast.error("Vinho já adicionado", {
        description: existingWine.name,

        action: {
          label: "fechar",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }

    createWine(wine);
    replace(`${pathname}`);
  }

  async function handleSubmit(formData: FormData) {
    const result = await createConsigned(EMPTY_FORM_STATE, formData);

    if (result?.status === "SUCCESS") {
      deleteCustomer();
      resetWines();
      push("/consignados");
    }

    if (result?.status === "ERROR") {
      setFormError(result.message);
      return;
    }

    if (result?.status === "VALIDATION_ERROR") {
      setFormError(result.message);
      return;
    }
  }

  function handleCancelForm() {
    deleteCustomer();
    resetWines();
    push("/consignados");
  }

  return (
    <form
      action={(formData) => startTransitionAction(() => handleSubmit(formData))}
    >
      {formError && (
        <Alert className="mt-6" variant="destructive">
          <TriangleAlert />
          <AlertTitle>Não foi possível criar um novo consignado</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <div className="grid max-w-[540px] grid-cols-1 sm:grid-cols-1 mt-6 gap-5">
        <div className="w-full  relative">
          <label htmlFor="customer" className="block">
            Cliente *
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
                  refresh();
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
                className="bg-white"
                onChange={(e) => handleSearchCustomer(e.target.value)}
                autoComplete="off"
                placeholder="Digite o nome do cliente"
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
          <label htmlFor="wine">Vinhos *</label>

          <div className="relative">
            <Input
              id="wine"
              type="text"
              className="bg-white"
              onChange={(e) => handleSearchWine(e.target.value)}
              autoComplete="off"
              defaultValue={searchParams.get("searchWine")?.toString()}
              placeholder="Digite o nome do vinho"
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
                    {wine.name}
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
                    <Button
                      variant="outline"
                      onClick={() => deleteWine(wine.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex mt-4 gap-2">
        <Button disabled={isPendingAction}>Salvar</Button>
        <Button onClick={handleCancelForm} variant="outline">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
