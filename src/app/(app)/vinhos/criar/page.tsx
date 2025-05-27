import { WineForm } from "@/app/(app)/vinhos/criar/wine-form";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro de Vinhos",
  description: "Cadastro de novos vinhos no sistema",
};

export default function CreateWinePage() {
  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">Adicionar vinho</h2>
      <Separator />
      <WineForm />
    </section>
  );
}
