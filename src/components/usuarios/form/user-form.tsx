"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface UserFormProps {
  roles: { id: string; name: string }[];
}

export function UserForm({ roles }: UserFormProps) {
  console.log(roles);
  return (
    <form>
      <h3 className="text-lg sm:text-2xl mb-5">Adicionar Novo Usuário</h3>

      {/* {formState.status === "ERROR" && (
    <Alert variant="destructive">
      <TriangleAlert />
      <AlertTitle>Não foi possível criar novo cliente</AlertTitle>
      <AlertDescription>{formState.message}</AlertDescription>
    </Alert>
  )} */}

      <div className="grid grid-cols-1  my-6 gap-x-5 gap-y-4">
        <input type="hidden" name="customerId" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3">
          <div>
            <label className="block">Nome*</label>
            <Input
              type="text"
              name="name"
              // defaultValue={
              //   formState.payload?.get("name")?.toString() ??
              //   customerToEdit?.name ??
              //   ""
              // }
            />
            {/* {formState.fieldErrors.name && (
            <span className="text-destructive pl-1 text-xs block mt-1">
              {formState.fieldErrors.name}
            </span>
          )} */}
          </div>
          <div>
            <label className="block">Email*</label>
            <Input
              type="text"
              name="name"
              // defaultValue={
              //   formState.payload?.get("name")?.toString() ??
              //   customerToEdit?.name ??
              //   ""
              // }
            />
            {/* {formState.fieldErrors.name && (
            <span className="text-destructive pl-1 text-xs block mt-1">
              {formState.fieldErrors.name}
            </span>
          )} */}
          </div>
          <div>
            <label className="block">Senha*</label>
            <Input
              type="text"
              name="name"
              // defaultValue={
              //   formState.payload?.get("name")?.toString() ??
              //   customerToEdit?.name ??
              //   ""
              // }
            />
            {/* {formState.fieldErrors.name && (
            <span className="text-destructive pl-1 text-xs block mt-1">
              {formState.fieldErrors.name}
            </span>
          )} */}
          </div>

          <div>
            <label htmlFor="">Cargo</label>
            <Select>
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
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          // disabled={isPending}
          className="bg-[#0d6efd] disabled:bg-[#0d6dfdad] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none"
        >
          Salvar
        </button>
        <Link
          href="/clientes"
          className="border border-[#0d6efd] text-center text-[#0d6efd] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer rounded-sm leading-none"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
