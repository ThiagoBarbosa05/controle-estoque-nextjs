"use client";
import { Customer, useCustomerStore } from "@/store/customer-store";
import { useWineStore } from "@/store/wine-store";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
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

type FormData = {
  customer: string;
  customerId: string;
  wines: Wine[];
};

interface Wine {
  id: string;
  name: string;
  quantity: number;
}

export function CreateNewConsignedForm() {
  const { customer: customerList } = useCustomerStore();
  const { wine: wineList } = useWineStore();
  const { createConsigned, isOpenForm } = useConsignedStore();

  const [suggestions, setSuggestions] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [wineSelectedList, setWineSelectedList] = useState<Wine[]>([]);

  const { register, handleSubmit, reset, control, setValue, watch } =
    useForm<FormData>({
      defaultValues: {
        customer: "",
        customerId: "",
        wines: [{ id: "", name: "", quantity: 0 }],
      },
    });

  const customerInput = watch("customer");
  const wineInput = useWatch({
    name: "wines",
    control,
  });

  useEffect(() => {
    if (!customerInput || customerInput.length === 0) {
      setSuggestions([]);
      return;
    }

    if (
      selectedCustomer &&
      selectedCustomer.customerName.toLowerCase() ===
        customerInput.toLowerCase()
    ) {
      setSuggestions([]);
      return;
    }

    const customersFiltered = customerList.filter((customer) =>
      customer.customerName.toLowerCase().includes(customerInput.toLowerCase())
    );

    setSuggestions(customersFiltered);
  }, [customerInput, customerList, selectedCustomer]);

  function handleSelectCustomer(customer: Customer) {
    setValue("customer", customer.customerName); // preenche o nome
    setValue("customerId", customer.id!.toString()); // salva o id
    setSelectedCustomer(customer);
    setSuggestions([]);
  }
  //   (wine) => ({
  //     label: wine.name,
  //     value: wine.id!,
  //   })
  // );

  const handleWineChange = (option: Wine | null) => {
    if (!option) return;

    const selectedWine = wineList.find((w) => w.id === option.id);
    const alreadyAdded = wineSelectedList.some((w) => w.id === option.id);

    if (selectedWine && !alreadyAdded) {
      const newWine = { id: option.id, name: option.name, quantity: 1 };

      setWineSelectedList((prev) => [...prev, newWine]);

      const currentWines = wineInput;

      if (currentWines.length > 0) {
        setValue("wines", [...currentWines, newWine]);
      }
    }
  };

  function onSubmit(data: FormData) {
    if (data.customer.length === 0) {
      alert("Selecione um cliente");
      return;
    } else if (wineSelectedList.length === 0) {
      alert("Selecione pelo menos um vinho");
      return;
    }

    createConsigned({
      customerId: data.customerId,
      wines: data.wines.filter(
        (wine) =>
          wine.quantity > 0 && wine.name.length > 0 && wine.id.length > 0
      ),
      customerName: data.customer,
    });

    reset();
    setWineSelectedList([]);
  }

  const handleRemoveWine = (id: string) => {
    const filtered = wineSelectedList.filter((w) => w.id !== id);
    setWineSelectedList(filtered);
    if (watch("wines").length > 0) {
      setValue(
        "wines",
        watch("wines").filter((w) => w.id !== id)
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={twMerge(
        "mt-6 border hidden border-zinc-300 p-4 rounded-md",
        isOpenForm && "block"
      )}
    >
      <h3 className="text-xl sm:text-2xl">Adicionar Novo Vinho</h3>

      <div className="grid grid-cols-1 sm:grid-cols-1 mt-6 gap-5">
        <div className="w-full  relative">
          <label htmlFor="customer" className="block">
            Cliente*
          </label>

          <input
            id="customer"
            type="text"
            autoComplete="off"
            {...register("customer")}
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
          />

          {/* Campo oculto com o ID */}
          <input type="hidden" {...register("customerId")} />

          {suggestions.length > 0 && (
            <ul className="border shadow-md shadow-zinc-300 absolute mt-2 rounded max-h-52 overflow-y-auto right-0 left-0 flex flex-col z-10 bg-white">
              {suggestions.map((customer) => (
                <li
                  onClick={() => handleSelectCustomer(customer)}
                  key={customer.id}
                  className="px-4 not-last:border-b hover:bg-accent cursor-pointer py-2"
                >
                  {customer.customerName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="">Vinho</label>
          <Controller
            name="wines"
            control={control}
            render={({ field }) => (
              <Select
                options={wineList.map((wine) => ({
                  id: wine.id!,
                  name: wine.name,
                  quantity: 1,
                }))}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                {...field}
                onChange={(val) => {
                  // field.onChange(val);
                  handleWineChange(val);
                }}
                isClearable
              />
            )}
          />

          <div className="w-full mt-4">
            {wineSelectedList.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-base">
                      Descrição
                    </TableHead>
                    <TableHead className="font-bold text-base">
                      Quantidade
                    </TableHead>
                    <TableHead className="font-bold text-base">Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {wineSelectedList.map((wine) => (
                    <TableRow key={wine.id}>
                      <TableCell>{wine.name}</TableCell>
                      <TableCell>
                        <input
                          onChange={(e) => {
                            let quantity: number;
                            if (e.target.value) {
                              quantity = parseInt(e.target.value, 10);
                            }

                            setWineSelectedList((prev) =>
                              prev.map((w) =>
                                w.id === wine.id ? { ...w, quantity } : w
                              )
                            );

                            if (watch("wines").length > 0) {
                              const updatedWines = watch("wines").map((w) =>
                                w.id === wine.id ? { ...w, quantity } : w
                              );

                              setValue("wines", updatedWines);
                            }
                          }}
                          min={1}
                          className="py-1.5 border max-w-[70px] text-center px-2  rounded-sm"
                          type="number"
                          value={wine.quantity}
                        />
                      </TableCell>
                      <TableCell>
                        <button
                          className="flex cursor-pointer hover:underline text-sm text-destructive items-center gap-1"
                          type="button"
                          onClick={handleRemoveWine.bind(null, wine.id)}
                        >
                          <X className="size-4" />
                          remover
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        {/* <div className="space-y-4 relative">
          <label className="block text-lg font-semibold">Vinhos</label>

          {fields.map((field, index) => (
            <div key={field.id}>
              <div>
                <label>Vinho</label>

                <input
                  type="text"
                  {...register(`wines.${index}.name`)}
                  autoComplete="off"
                  className="border px-3 py-1.5 rounded w-full"
                  onBlur={() => {
                    // Pequeno atraso pra dar tempo de capturar o clique na sugestão
                    setTimeout(() => {
                      setWineSuggestions((prev) => ({ ...prev, [index]: [] }));
                    }, 100);
                  }}
                />
                {wineSuggestions[index]?.length > 0 && (
                  <ul className="border rounded mt-1 bg-white max-h-32 overflow-y-auto w-full">
                    {wineSuggestions[index].map((w) => (
                      <li
                        key={w.id}
                        onClick={() => handleSelectWine(index, w)}
                        className="px-3 py-2 hover:bg-accent cursor-pointer"
                      >
                        {w.name}
                      </li>
                    ))}
                  </ul>
                )}
                <input type="hidden" {...register(`wines.${index}.id`)} />
              </div>

              <div>
                <label>Quantidade</label>
                <input
                  type="number"
                  {...register(`wines.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  className="border px-3 py-1.5 rounded w-full"
                  min={1}
                />
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm hover:underline mt-2"
              >
                Remover Vinho
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", id: "", quantity: 1 })}
            className="text-sm text-blue-600 hover:underline"
          >
            + Adicionar Vinho
          </button>
        </div> */}
      </div>

      <button className="bg-[#0d6efd] mt-4 w-full sm:w-[initial]  py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0d6efd] text-white rounded-sm leading-none">
        Salvar
      </button>
    </form>
  );
}
