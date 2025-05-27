import { Wine } from "@/interfaces/list-wines-response";
import { WineForm } from "../../criar/wine-form";
import { getToken } from "@/app/auth/get-token";

export async function getWine(wineId: string): Promise<{ wine: Wine }> {
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

interface EditWineWrapperProps {
  wineId: string;
}

export async function EditWineWrapper({ wineId }: EditWineWrapperProps) {
  const result = await getWine(wineId);

  return <WineForm wine={result.wine} />;
}
