"use client";

import { zodCNPJ } from "@/lib/cnpj-validator";
import { formatCNPJ } from "@/lib/format-cnpj";
import { formatLandline } from "@/lib/format-landline";
import { formatPhone } from "@/lib/format-phone";
import { useCustomerStore } from "@/store/customer-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const customerFormSchema = z.object({
  customerName: z.string().min(3, { message: "Insira o nome do cliente" }),
  contact: z.string().optional(),
  document: zodCNPJ(),
  email: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\(\d{2}\) \d{5}-\d{4}$/.test(val), {
      message: "Número de celular inválido",
    }),

  businessPhone: z
    .string()
    .optional()
    .refine((val) => !val || /^\(\d{2}\) \d{4}-\d{4}$/.test(val), {
      message: "Telefone comercial inválido",
    }),
});

type FormData = z.infer<typeof customerFormSchema>;

export function CreateNewCustomerForm() {
  const { createCustomer, isOpenForm } = useCustomerStore();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      document: "",
      phone: "",
      businessPhone: "",
    },
  });

  function onSubmit(newCustomer: FormData) {
    createCustomer(newCustomer);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={twMerge(
        "mt-6 border hidden border-zinc-300 p-4 rounded-md",
        isOpenForm && "block"
      )}
    >
      <h3 className="text-lg sm:text-2xl">Adicionar Novo Cliente</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-x-5 gap-y-3">
        <div>
          <label className="block">Nome do Cliente*</label>
          <input
            className="border w-full px-3  py-1.5 border-zinc-300 rounded-sm"
            type="text"
            {...register("customerName")}
          />
          {errors.customerName && (
            <span className="text-xs text-destructive">
              {errors.customerName.message}
            </span>
          )}
        </div>

        <div>
          <label className="block">CNPJ*</label>
          <Controller
            control={control}
            name="document"
            render={({ field }) => (
              <input
                className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
                type="text"
                {...field}
                placeholder="00.000.000/0000-00"
                onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
              />
            )}
          />
          {errors.document && (
            <span className="text-xs text-destructive">
              {errors.document.message}
            </span>
          )}
        </div>

        <div>
          <label className="block">Pessoa de Contato</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            {...register("contact")}
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            className="border w-full px-3  py-1.5 border-zinc-300 rounded-sm"
            type="email"
            {...register("email")}
            placeholder="exemplo@email.com"
          />
          {errors.email && (
            <span className="text-xs text-destructive">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label className="block">Celular</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="border w-full px-3  py-1.5 border-zinc-300 rounded-sm"
                type="text"
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                placeholder="(00) 00000-0000"
              />
            )}
          />
          {errors.phone && (
            <span className="text-xs text-destructive">
              {errors.phone.message}
            </span>
          )}
        </div>
        <div>
          <label className="block">Telefone comercial</label>
          <Controller
            name="businessPhone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="border w-full px-3  py-1.5 border-zinc-300 rounded-sm"
                onChange={(e) => field.onChange(formatLandline(e.target.value))}
                placeholder="(00) 0000-0000"
              />
            )}
          />
          {errors.businessPhone && (
            <span className="text-xs text-destructive">
              {errors.businessPhone.message}
            </span>
          )}
        </div>
      </div>

      <button className="bg-[#0d6efd] w-full sm:w-[initial] mt-6 py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none">
        Salvar
      </button>
    </form>
  );
}
