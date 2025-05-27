export type WineDetails = {
  id: string;
  name: string;
  harvest: string;
  createdAt: string;
  updatedAt: string;
  country: string;
  price: number;
  producer: string;
  size: string;
  type: string;
  WineOnConsigned: {
    wineId: string;
    consignedId: string;
    balance: number;
    consigned: {
      id: string;
      customer: {
        id: string;
        name: string;
      };
    };
  }[];
};

export interface GetWineDetailsResponse {
  wine: WineDetails;
}
