import { Separator } from "@/components/ui/separator";
import { CustomerForm } from "@/app/(app)/clientes/customer-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adicionar cliente",
  description: "Adicionar um novo cliente",
};

export default function CreateCustomerPage() {
  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">
        Adicionar Novo Cliente
      </h2>
      <Separator />
      <CustomerForm />
    </section>
  );
}
