import { getToken } from "@/app/auth/get-token";
import { WineCountForm } from "@/app/(app)/consignados/[consignedId]/[customerId]/contagem/count-wine";
import { GetConsignedDetailsResponse } from "@/interfaces/get-consigned-details-response";

async function getConsignedDetails(
  consignedId: string
): Promise<GetConsignedDetailsResponse | null> {
  const accessToken = await getToken();

  const response = await fetch(
    `${process.env.API_BASE_URL}/consigned/${consignedId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: { tags: ["consigned-details"] },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    return null;
  }

  return response.json();
}

interface WineCountWrapperProps {
  consignedId: string;
}

export async function WineCountWrapper({ consignedId }: WineCountWrapperProps) {
  const result = await getConsignedDetails(consignedId);

  return (
    <>
      {!result ? (
        <div className="mt-6 w-full text-center text-zinc-600">
          <p>Ainda não foi realizada nenhuma contagem.</p>
        </div>
      ) : (
        <WineCountForm consigned={result.consigned} />
      )}
    </>
  );
}
