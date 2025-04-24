"use client";

import { formatCurrencyInput } from "@/lib/format-currency";
import { parseCurrencyToNumber } from "@/lib/parse-currency";
import { useWineStore } from "@/store/wine-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const wineFormSchema = z.object({
  name: z.string().min(1, { message: "Insira o nome do vinho" }),
  harvest: z.string().optional(),
  type: z.string().min(1, { message: "Insira o tipo do vinho" }),
  price: z.string().min(1, { message: "Insira o preço do vinho" }),
  producer: z.string().optional(),
  country: z.string().optional(),
});

type FormData = z.infer<typeof wineFormSchema>;

export function CreateNewWineForm() {
  const { createWine } = useWineStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(wineFormSchema),
    defaultValues: {
      price: "",
    },
  });

  function onSubmit(data: FormData) {
    createWine({ ...data, price: parseCurrencyToNumber(data.price) });
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 border border-zinc-300 p-4 rounded-md"
    >
      <h3 className="text-xl sm:text-2xl">Adicionar Novo Vinho</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-5">
        <div>
          <label className="block">Nome do Vinho*</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs text-destructive">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label className="block">Tipo*</label>
          <select
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            {...register("type")}
          >
            <option disabled value={""}>
              Selecione o tipo do vinho
            </option>
            <option value={"Tinto"}>Tinto</option>
            <option value={"Branco"}>Branco</option>
            <option value={"Rose"}>Rose</option>
            <option value={"Espumante"}>Espumante</option>
            <option value={"Outro"}>Outro</option>
          </select>
          {errors.type && (
            <span className="text-xs text-destructive">
              {errors.type.message}
            </span>
          )}
        </div>
        <div>
          <label className="block">Safra</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="number"
            {...register("harvest")}
          />
          {errors.harvest && (
            <span className="text-xs text-destructive">
              {errors.harvest.message}
            </span>
          )}
        </div>
        <div>
          <label className="block">Produtor</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            {...register("producer")}
          />
          {errors.producer && (
            <span className="text-xs text-destructive">
              {errors.producer.message}
            </span>
          )}
        </div>
        <div>
          <label className="block">País</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            {...register("country")}
          />
          {errors.country && (
            <span className="text-xs text-destructive">
              {errors.country.message}
            </span>
          )}
        </div>
        <div>
          <label className="block">Preço</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
                onChange={(e) =>
                  field.onChange(formatCurrencyInput(e.target.value))
                }
                value={field.value}
                placeholder={`${formatCurrencyInput("0,00")}`}
              />
            )}
          />
          {errors.price && (
            <span className="text-xs text-destructive">
              {errors.price.message}
            </span>
          )}
        </div>
      </div>

      <button className="bg-[#188754] w-full sm:w-[initial] mt-6 py-3 px-4 text-sm cursor-pointer transition hover:bg-[#03a679] text-white rounded-sm leading-none">
        Salvar
      </button>
    </form>
  );
}
