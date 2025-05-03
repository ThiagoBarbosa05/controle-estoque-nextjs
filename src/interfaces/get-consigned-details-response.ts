export type ConsignedDetails = {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: "EM_ANDAMENTO" | "CONCLUÍDO";
  customer: {
    id: string;
    name: string;
  };

  winesOnConsigned: {
    consignedId: string;
    wineId: string;
    balance: number;
    count: number | null;
    wines: {
      id: string;
      name: string;
      price: number;
      type: string;
      country: string;
      size: string;
    };
  }[];
};

export interface GetConsignedDetailsResponse {
  consigned: ConsignedDetails;
}
