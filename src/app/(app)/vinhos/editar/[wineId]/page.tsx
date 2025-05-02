import { getToken } from "@/app/auth/get-token";
import { WineForm } from "@/components/vinhos/form";
import { Wine } from "@/interfaces/list-wines-response";

async function getWine(wineId: string): Promise<{ wine: Wine }> {
  const token = await getToken();

  const response = await fetch(`${process.env.API_BASE_URL}/wines/${wineId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "force-cache",
    next: { tags: ["wine-details"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wine data");
  }

  return response.json();
}

export default async function EditWinePage(props: {
  params: Promise<{ wineId: string }>;
}) {
  const { wineId } = await props.params;

  const result = await getWine(wineId);

  return <WineForm wine={result.wine} />;
}
