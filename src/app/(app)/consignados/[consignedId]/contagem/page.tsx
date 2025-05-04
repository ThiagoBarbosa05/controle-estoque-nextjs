import { getToken } from "@/app/auth/get-token";
import { WineCountForm } from "@/components/consignados/form/count-wine";
import { GetConsignedDetailsResponse } from "@/interfaces/get-consigned-details-response";

async function getConsignedDetails(
  consignedId: string
): Promise<GetConsignedDetailsResponse> {
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
    throw new Error(error.message || "Failed to fetch consigned details");
  }

  return response.json();
}

export default async function ConsignedCountPage(props: {
  params: Promise<{ consignedId: string }>;
}) {
  const { consignedId } = await props.params;

  const { consigned } = await getConsignedDetails(consignedId);

  return <WineCountForm consigned={consigned} />;
}
