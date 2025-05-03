"use client";

import { createWine } from "@/app/actions/create-wine";
import { editWine } from "@/app/actions/edit-wine";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wine } from "@/interfaces/list-wines-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

const wineTypes = [
  { id: "Tinto", name: "Tinto" },
  { id: "Branco", name: "Branco" },
  { id: "Rose", name: "Rose" },
  { id: "Espumante", name: "Espumante" },

  { id: "outro", name: "Outro" },
];

const wineCountry = [
  { id: "Argentina", name: "Argentina" },
  { id: "Chile", name: "Chile" },
  { id: "Brasil", name: "Brasil" },
  { id: "Espanha", name: "Espanha" },
  { id: "Portugal", name: "Portugal" },
  { id: "França", name: "França" },
  { id: "Itália", name: "Itália" },
  { id: "Outro", name: "Outro" },
];

const wineSize = [
  { id: "750ml", name: "750ml" },
  { id: "1500ml", name: "1500ml" },
  { id: "187ml", name: "187ml" },
  { id: "375ml", name: "375ml" },
];

interface WineFormProps {
  wine?: Wine;
}

export function WineForm({ wine }: WineFormProps) {
  const [formState, action, isPending] = useActionState(
    wine ? editWine : createWine,
    EMPTY_FORM_STATE
  );

  const [price, setPrice] = useState(
    wine ? formatCurrencyInput(wine!.price.toString()) : ""
  );

  return (
    <form
      action={action}
      className="mt-6 border  border-zinc-300 p-4 rounded-md"
    >
      <h3 className="text-xl sm:text-2xl">Adicionar Novo Vinho</h3>

      {formState.status === "ERROR" && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Não foi possível criar novo vinho</AlertTitle>
          <AlertDescription>{formState.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-5">
        <input type="hidden" name="wineId" value={wine?.id} />
        <div>
          <label className="block">Nome do Vinho*</label>
          <Input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            name="name"
            defaultValue={
              formState.payload?.get("name")?.toString() ?? wine?.name ?? ""
            }
          />
          {formState.fieldErrors.name && (
            <span className="text-xs text-destructive">
              {formState.fieldErrors.name}
            </span>
          )}
        </div>
        <div>
          <label className="block">Tipo*</label>
          <Select
            name="type"
            defaultValue={
              formState.payload?.get("type")?.toString() ?? wine?.type ?? ""
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo do vinho" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {wineTypes.map((wine) => (
                <SelectItem key={wine.id} value={wine.id}>
                  {wine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {formState.fieldErrors.type && (
            <span className="text-xs text-destructive">
              {formState.fieldErrors.type}
            </span>
          )}
        </div>
        <div>
          <label className="block">Safra</label>
          <Input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="number"
            name="harvest"
            defaultValue={
              formState.payload?.get("harvest")?.toString() ??
              wine?.harvest ??
              ""
            }
          />
          {formState.fieldErrors.harvest && (
            <span className="text-xs text-destructive">
              {formState.fieldErrors.harvest}
            </span>
          )}
        </div>
        <div>
          <label className="block">Produtor</label>
          <Input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            name="producer"
            defaultValue={
              formState.payload?.get("producer")?.toString() ??
              wine?.producer ??
              ""
            }
          />
          {formState.fieldErrors.producer && (
            <span className="text-xs text-destructive">
              {formState.fieldErrors.producer}
            </span>
          )}
        </div>

        <div>
          <label className="block">Preço*</label>

          <Input
            type="text"
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            name="price"
            inputMode="numeric"
            onChange={(e) => setPrice(formatCurrencyInput(e.target.value))}
            value={price || ""}
            defaultValue={
              formState.payload?.get("price")?.toString() ?? price ?? ""
            }
            placeholder={`${formatCurrencyInput("0,00")}`}
          />

          {formState.fieldErrors.price && (
            <span className="text-xs text-destructive">
              {formState.fieldErrors.price}
            </span>
          )}
        </div>

        <div>
          <label className="block">País*</label>
          <Select
            name="country"
            defaultValue={
              formState.payload?.get("country")?.toString() ??
              wine?.country ??
              ""
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o país do vinho" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {wineCountry.map((wine) => (
                <SelectItem key={wine.id} value={wine.id}>
                  {wine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {formState.fieldErrors.country && (
            <span className="text-xs text-destructive">
              {formState.fieldErrors.country}
            </span>
          )}
        </div>
        <div>
          <label className="block">Tamanho*</label>
          <Select
            name="size"
            defaultValue={
              formState.payload?.get("size")?.toString() ?? wine?.size ?? ""
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tamanho do vinho" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {wineSize.map((wine) => (
                <SelectItem key={wine.id} value={wine.id}>
                  {wine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {formState.fieldErrors.size && (
            <span className="text-xs text-destructive">
              {formState.fieldErrors.size}
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <button
          disabled={isPending}
          className="bg-[#188754] disabled:bg-[#386651] w-full sm:w-[initial] py-3 px-4 text-sm cursor-pointer transition hover:bg-[#03a679] text-white rounded-sm leading-none"
        >
          Salvar
        </button>
        <Link
          className="border text-center border-[#188754] w-full sm:w-[initial] py-3 px-4 text-sm text-[#188754] rounded-sm leading-none"
          href={"/vinhos"}
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
