import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { EditWineSkeleton } from "./edit-wine-skeleton";
import { EditWineWrapper, getWine } from "./edit-wine-wrapper";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ wineId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { wineId } = await params;

  const wine = await getWine(wineId);

  return {
    title: `Editar vinho | ${wine.wine.name}`,
    description: `Editar informações do vinho ${wine.wine.name}`,
  };
}

export default async function EditWinePage(props: {
  params: Promise<{ wineId: string }>;
}) {
  const { wineId } = await props.params;

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">Editar vinho</h2>
      <Separator />
      <Suspense fallback={<EditWineSkeleton />}>
        <EditWineWrapper wineId={wineId} />
      </Suspense>
    </section>
  );
}
