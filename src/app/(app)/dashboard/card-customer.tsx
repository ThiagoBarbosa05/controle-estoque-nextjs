import { Contact } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CardCustomer({
  customersQuantity,
}: {
  customersQuantity: number;
}) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center  justify-between">
        <CardTitle className="text-[#93173c]">Total de Clientes</CardTitle>
        <Contact className="text-[#93173c] size-7" />
      </CardHeader>
      <CardContent>
        <span className="text-4xl text-[#93173c] sm:text-6xl font-light">
          {customersQuantity}
        </span>
      </CardContent>
    </Card>
    // <div className="p-4 text-white rounded-lg bg-[#0d6efd]">
    //   <p className="text-lg sm:text-xl mb-2 min-h-12">Total de Clientes</p>

    //   <span className="text-4xl sm:text-6xl font-light">
    //     {customersQuantity}
    //   </span>
    // </div>
  );
}
