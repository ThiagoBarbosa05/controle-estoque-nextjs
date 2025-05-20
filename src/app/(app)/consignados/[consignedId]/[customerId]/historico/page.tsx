import { ListHistory } from "./list-history";

export default async function ConsignedHistoryPage(props: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await props.params;

  return <ListHistory customerId={customerId} />;
}
