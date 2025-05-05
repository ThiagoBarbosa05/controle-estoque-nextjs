import { ConsignedNavigation } from "@/components/consignados/navigation";

export default async function ConsignedDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ consignedId: string; customerId: string }>;
}) {
  const { consignedId, customerId } = await params;

  console.log(await params);

  return (
    <section className="flex flex-1 flex-col w-full items-start">
      <h2 className="text-xl sm:text-4xl font-medium">
        Detalhes do Consignado
      </h2>
      <ConsignedNavigation consignedId={consignedId} customerId={customerId} />
      {children}
    </section>
  );
}
