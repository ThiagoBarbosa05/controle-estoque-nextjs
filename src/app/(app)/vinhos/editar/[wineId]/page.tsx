import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { EditWineSkeleton } from "./edit-wine-skeleton";
import { EditWineWrapper } from "./edit-wine-wrapper";

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
