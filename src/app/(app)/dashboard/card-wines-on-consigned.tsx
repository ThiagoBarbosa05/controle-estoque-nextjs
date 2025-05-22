import { CircleDollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardWinesOnConsignedProps {
  winesOnConsigned: number;
}

export function CardWinesOnConsigned({
  winesOnConsigned,
}: CardWinesOnConsignedProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#93173c]">
          Total em Consignação (garrafas)
        </CardTitle>
        <CircleDollarSign className="text-[#93173c] size-7" />
      </CardHeader>
      <CardContent>
        <span className="text-4xl text-[#93173c] sm:text-6xl font-light">
          {winesOnConsigned}
        </span>
      </CardContent>
    </Card>
  );
}
