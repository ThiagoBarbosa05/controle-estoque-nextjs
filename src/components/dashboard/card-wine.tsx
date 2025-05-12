import { Wine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function CardWine({ winesQuantity }: { winesQuantity: number }) {
  return (
    <Card className="border-[#93173c]">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-[#93173c] text-lg sm:text-xl">
          Total de Vinhos
        </CardTitle>
        <Wine className="text-[#93173c] size-7" />
      </CardHeader>
      <CardContent>
        <span className="text-4xl text-[#93173c] sm:text-6xl font-light">
          {winesQuantity}
        </span>
      </CardContent>
    </Card>
    // <div className="p-4 text-white rounded-lg bg-[#188754]">
    //   <p className="text-lg sm:text-xl mb-2 min-h-12">Total de Vinhos</p>

    //   <span className="text-4xl sm:text-6xl font-light">{winesQuantity}</span>
    // </div>
  );
}
