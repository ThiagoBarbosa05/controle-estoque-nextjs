import { ListWinesResponse } from "@/interfaces/list-wines-response";
import { getToken } from "@/app/auth/get-token";
import { GetConsignedDetailsResponse } from "@/interfaces/get-consigned-details-response";
import { Button } from "@/components/ui/button";
import { AddWine } from "./add-wine";

async function listWines(searchTerm?: string): Promise<ListWinesResponse> {
  const accessToken = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/wines?search=${searchTerm}`,
    {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function AddNewWine({
  searchTerm,
  result,
}: {
  searchTerm?: string;
  result: GetConsignedDetailsResponse | null;
}) {
  const resultWines = await listWines(searchTerm);

  return (
    <AddWine
      consigned={{
        customerId: result!.consigned.customer.id,
        id: result!.consigned.id,
      }}
      wines={resultWines.wines}
      winesOnTheList={result?.consigned.winesOnConsigned.map((wine) => ({
        wineId: wine.wineId,
        quantity: wine.balance,
      }))}
    >
      <Button className="mt-4" variant="outline" type="button">
        Adicionar vinhos
      </Button>
    </AddWine>
  );
}
