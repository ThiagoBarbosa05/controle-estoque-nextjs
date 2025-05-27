import { getToken } from "@/app/auth/get-token";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetWineDetailsResponse } from "@/interfaces/get-wine-details-response";
import { formatCurrencyInput } from "@/lib/format-currency";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Amphora,
  Calendar,
  CalendarCheck2,
  DollarSign,
  Globe,
  MapPin,
  MapPinned,
  Wine,
} from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ wineId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { wineId } = await params;

  const wine = await getWineDetails(wineId);

  return {
    title: `vinhos | ${wine.wine.name}`,
    description: `Detalhes do vinho ${wine.wine.name}`,
  };
}

async function getWineDetails(wineId: string): Promise<GetWineDetailsResponse> {
  const accessToken = await getToken();

  const res = await fetch(
    `${process.env.API_BASE_URL}/wines/${wineId}/details`,

    {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    console.log(res.status);
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function WinePage(props: {
  params: Promise<{ wineId: string }>;
}) {
  const { wineId } = await props.params;
  const { wine } = await getWineDetails(wineId);

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-medium pb-3">{wine.name}</h2>
      <Separator />

      <section>
        <div className="mt-10 max-w-[720px] grid sm:grid-cols-4 grid-cols-2 gap-x-3 gap-y-10">
          <div className="flex items-start gap-2">
            <Wine className="size-5 text-zinc-700" />
            <div className="space-y-2">
              <strong className="block">Tipo</strong>
              <p className="text-zinc-700 text-sm">{wine.type}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="size-5 text-zinc-700" />
            <div className="space-y-2">
              <strong className="block">Safra</strong>
              <p className="text-zinc-700 text-sm">{wine.harvest}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Amphora className="size-5 text-zinc-700" />
            <div className="space-y-2">
              <strong className="block">Tamanho</strong>
              <p className="text-zinc-700 text-sm">{wine.size}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <DollarSign className="size-5 text-zinc-700" />
            <div className="space-y-2">
              <strong className="block">Preço</strong>
              <p className="text-zinc-700 text-sm">
                {formatCurrencyInput(wine.price.toString())}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Globe className="size-5 text-zinc-700" />
            <div className="space-y-2">
              <strong className="block">País</strong>
              <p className="text-zinc-700 text-sm">{wine.country}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="size-5 text-zinc-700" />
            <div className="space-y-2">
              <strong className="block">Produtor</strong>
              <p className="text-zinc-700 text-sm">{wine.producer}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CalendarCheck2 className="size-5 text-zinc-700" />
            <div className="space-y-2">
              <strong className="block">Data de criação</strong>
              <p className="text-zinc-700 text-sm">
                {format(wine.createdAt, "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="size-5 text-zinc-700" />
            <div className="space-y-2">
              <strong className="block">Última atualização</strong>
              <p className="text-zinc-700 text-sm">
                {format(wine.updatedAt, "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[620px] mt-10">
        <h3 className="text-lg font-semibold mb-2">Resumo</h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Saldo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wine.WineOnConsigned.map((wineOnConsigned) => (
              <TableRow
                key={wineOnConsigned.consignedId + wineOnConsigned.wineId}
              >
                <TableCell>{wineOnConsigned.consigned.customer.name}</TableCell>
                <TableCell>{wineOnConsigned.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </section>
  );
}
