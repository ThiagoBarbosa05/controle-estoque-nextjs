"use client";

import { createUser } from "@/app/actions/create-user";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ListCustomerResponse } from "@/interfaces/list-customer-response";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

interface UserFormProps {
  roles: { id: string; name: string }[];
  customers: ListCustomerResponse;
}

export function UserForm({ roles, customers: customerList }: UserFormProps) {
  const [roleSelected, setRoleSelected] = useState(false);
  const [isPendingCustomer, startTransition] = useTransition();
  const [formState, action, isPending] = useActionState(
    createUser,
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
  }, 300);

  function handleSelectRole(roleId: string) {
    const role = roles.find((role) => role.id === roleId);

    if (role?.name === "cliente") {
      setRoleSelected(true);
      return;
    }

    setRoleSelected(false);
  }

  console.log(formState);

  return (
    <form action={action}>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">
        Adicionar novo usuário
      </h2>
      <Separator />
      {formState.status === "ERROR" && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Não foi possível criar novo cliente</AlertTitle>
          <AlertDescription>{formState.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1  my-6 gap-x-5 gap-y-4">
        <input type="hidden" name="customerId" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3">
          <div>
            <label className="block">Nome*</label>
            <Input
              type="text"
              name="name"
              className="bg-white"
              placeholder="nome do usuário"
              defaultValue={formState.payload?.get("name")?.toString() ?? ""}
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
              className="bg-white"
              placeholder="exemplo@email.com"
              defaultValue={formState.payload?.get("email")?.toString() ?? ""}
            />
            {formState.fieldErrors.email && (
              <span className="text-destructive pl-1 text-xs block mt-1">
                {formState.fieldErrors.email}
              </span>
            )}
          </div>
          <div>
            <label className="block">Senha*</label>
            <Input
              type="password"
              name="password"
              className="bg-white"
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
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione o cargo do usuário" />
              </SelectTrigger>
              <SelectContent className="w-full bg-white">
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
        <div>
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
                defaultValue={
                  customerList.customers.length > 0
                    ? customerList.customers[0].id
                    : ""
                }
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
        <Button disabled={isPending}>Salvar</Button>
        <Button asChild variant="outline">
          <Link href="/usuarios">Cancelar</Link>
        </Button>
      </div>
    </form>
  );
}
