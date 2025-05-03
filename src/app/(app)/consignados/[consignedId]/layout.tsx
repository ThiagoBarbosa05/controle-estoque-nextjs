import { ConsignedNavigation } from "@/components/consignados/navigation";

export default async function ConsignedDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ consignedId: string }>;
}) {
  const { consignedId } = await params;

  return (
    <section className="flex flex-1 flex-col w-full items-start justify-between ">
      <h2 className="text-xl sm:text-4xl font-medium">
        Detalhes do Consignado
      </h2>
      <ConsignedNavigation consignedId={consignedId} />
      {children}
    </section>
  );
}
