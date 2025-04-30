"use client";

import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { updateUser } from "@/app/actions/update.use";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/interfaces/get-user-response";
import { ListCustomerResponse } from "@/interfaces/list-customer-response";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";

interface EditUserFormProps {
  roles: { id: string; name: string }[];
  customers: ListCustomerResponse;
  user?: User;
}

export function EditUserForm({
  customers: customerList,
  roles,
  user,
}: EditUserFormProps) {
  const [roleSelected, setRoleSelected] = useState(
    user?.roles[0].name === "cliente"
  );
  const [isPendingCustomer, startTransition] = useTransition();
  const [formState, action, isPending] = useActionState(
    updateUser,
    EMPTY_FORM_STATE
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchCustomer = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 400);

  function handleSelectRole(roleId: string) {
    const role = roles.find((role) => role.id === roleId);

    if (role?.name === "cliente") {
      setRoleSelected(true);
      return;
    }

    setRoleSelected(false);
  }

  return (
    <form action={action}>
      <h3 className="text-lg sm:text-2xl mb-5">Adicionar Novo Usuário</h3>
      {formState.status === "ERROR" && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Não foi possível criar novo cliente</AlertTitle>
          <AlertDescription>{formState.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1  my-6 gap-x-5 gap-y-4">
        <input type="hidden" name="userId" value={user?.id} />

        {/* <input type="hidden" name="customerId" /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3">
          <div>
            <label className="block">Nome*</label>
            <Input
              type="text"
              name="name"
              placeholder="nome do usuário"
              defaultValue={
                formState.payload?.get("name")?.toString() ?? user?.name ?? ""
              }
            />
            {formState.fieldErrors.name && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.name}
              </span>
            )}
          </div>
          <div>
            <label className="block">Email*</label>
            <Input
              type="text"
              name="email"
              placeholder="exemplo@email.com"
              defaultValue={
                formState.payload?.get("email")?.toString() ?? user?.email ?? ""
              }
            />
            {formState.fieldErrors.email && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.email}
              </span>
            )}
          </div>
          <div>
            <label className="block">Nova Senha*</label>
            <Input
              type="password"
              name="password"
              defaultValue={
                formState.payload?.get("password")?.toString() ?? ""
              }
            />
            {formState.fieldErrors.password && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.password}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="">Cargo</label>
            <Select
              name="role"
              onValueChange={(value) => handleSelectRole(value)}
              defaultValue={user?.roles[0].id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cargo do usuário" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formState.fieldErrors.role && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.role}
              </span>
            )}
          </div>
        </div>
      </div>

      {roleSelected && (
        <div className={twMerge(!roleSelected && "hidden")}>
          <h4 className="mb-3 text-lg sm:text-xl">
            Associe um cliente ao usuário:
          </h4>
          <div className="p-2 rounded-md bg-accent">
            <div className="relative">
              <Input
                type="search"
                className="bg-white text-sm focus-visible:ring-0"
                onChange={(e) => handleSearchCustomer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="Pesquise um cliente"
                defaultValue={searchParams.get("search")?.toString()}
              />
              {/* <Search className="size-5 text-zinc-400 absolute top-1/2 right-3 -translate-y-1/2" /> */}
            </div>

            {isPendingCustomer ? (
              <div className="w-full flex items-center py-4 justify-center flex-1">
                <span>
                  <LoaderCircle className="animate-spin size-5 text-[#7e1e2a]" />
                </span>
              </div>
            ) : (
              <RadioGroup
                name="customer"
                className="gap-0"
                defaultValue={user ? user.customer.id : ""}
              >
                {customerList.customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex not-last:border-b bg-accent items-center text-sm gap-2 p-3"
                  >
                    <RadioGroupItem
                      value={customer.id}
                      id={`customer+${customer.name}`}
                      className="border-[#7e1e2a]"
                    />
                    <label htmlFor={`customer+${customer.name}`}>
                      {customer.name}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col mt-6 sm:flex-row gap-4">
        <button
          disabled={isPending}
          className="bg-[#0d6efd] disabled:bg-[#0d6dfdad] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none"
        >
          Salvar
        </button>
        <Link
          href="/usuarios"
          className="border border-[#0d6efd] text-center text-[#0d6efd] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer rounded-sm leading-none"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
